import { NextResponse } from "next/server";

import { handleIncomingMessage } from "@/lib/whatsapp/bot";
import { isWhatsAppConfigured, sendWhatsAppText } from "@/lib/whatsapp/client";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");
  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN?.trim();

  if (mode === "subscribe" && token && verifyToken && token === verifyToken) {
    return new NextResponse(challenge ?? "", { status: 200 });
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

export async function POST(request: Request) {
  if (!isWhatsAppConfigured()) {
    return NextResponse.json(
      { error: "WhatsApp no configurado" },
      { status: 503 },
    );
  }

  let payload: WhatsAppWebhookPayload;
  try {
    payload = (await request.json()) as WhatsAppWebhookPayload;
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const messages = extractMessages(payload);

  for (const message of messages) {
    try {
      const reply = await handleIncomingMessage(message);
      for (const body of reply.messages) {
        await sendWhatsAppText({ to: message.from, body });
      }
    } catch (error) {
      console.error("WhatsApp bot error", error);
      try {
        await sendWhatsAppText({
          to: message.from,
          body: "Tuve un problema técnico. Probá de nuevo en un momento o escribí *cotizar*.",
        });
      } catch {
        // ignore secondary failure
      }
    }
  }

  // Meta espera 200 rápido.
  return NextResponse.json({ ok: true });
}

type WhatsAppWebhookPayload = {
  object?: string;
  entry?: Array<{
    changes?: Array<{
      value?: {
        messages?: Array<{
          from?: string;
          id?: string;
          type?: string;
          text?: { body?: string };
        }>;
      };
    }>;
  }>;
};

function extractMessages(payload: WhatsAppWebhookPayload) {
  const result: Array<{ from: string; text: string; messageId?: string }> = [];

  for (const entry of payload.entry ?? []) {
    for (const change of entry.changes ?? []) {
      for (const message of change.value?.messages ?? []) {
        if (message.type !== "text" || !message.from || !message.text?.body) {
          continue;
        }
        result.push({
          from: message.from,
          text: message.text.body,
          messageId: message.id,
        });
      }
    }
  }

  return result;
}
