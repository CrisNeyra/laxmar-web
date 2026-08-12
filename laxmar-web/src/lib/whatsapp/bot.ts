import { CONTACT } from "@/lib/contact";
import { estimatePrice, formatArs, type PriceEstimate } from "@/lib/pricing";
import {
  isAffirmative,
  isNegative,
  isRestart,
  looksLikeName,
  parsePassengers,
  parseRoute,
  parseTravelDate,
} from "@/lib/whatsapp/parser";
import {
  clearConversation,
  getConversation,
  resetConversation,
  saveConversation,
} from "@/lib/whatsapp/store";
import type { ConversationState, IncomingWhatsAppMessage } from "@/lib/whatsapp/types";

export type BotReply = {
  messages: string[];
};

const WELCOME = [
  "¡Hola! Soy el asistente de Laxmar 🚐",
  "Te armo una *estimación orientativa* de precio. No es cotización final.",
  "Para empezar, ¿cómo es tu *nombre*?",
].join("\n");

export async function handleIncomingMessage(
  message: IncomingWhatsAppMessage,
): Promise<BotReply> {
  const text = message.text.trim();
  if (!text) {
    return { messages: ["No pude leer el mensaje. ¿Me lo reenviás en texto?"] };
  }

  let state = getConversation(message.from);

  if (!state || isRestart(text)) {
    state = resetConversation(message.from);
    if (isRestart(text) && /hola|menu|menú|cotizar|reiniciar|empezar/i.test(text)) {
      return { messages: [WELCOME] };
    }
  }

  const replies = await advanceConversation(state, text);
  return { messages: replies };
}

async function advanceConversation(
  state: ConversationState,
  text: string,
): Promise<string[]> {
  switch (state.step) {
    case "awaiting_name": {
      if (!looksLikeName(text)) {
        return ["Decime tu nombre y apellido, por favor."];
      }
      state.draft.name = capitalizeName(text);
      state.step = "awaiting_passengers";
      saveConversation(state);
      return [
        `Gracias, ${state.draft.name}.`,
        "¿Cuántos *pasajeros* viajan? (entre 1 y 45)",
      ];
    }

    case "awaiting_passengers": {
      const passengers = parsePassengers(text);
      if (!passengers) {
        return ["Necesito un número entre 1 y 45. Ejemplo: *20*"];
      }
      state.draft.passengers = passengers;
      state.step = "awaiting_date";
      saveConversation(state);
      return [
        "Perfecto.",
        "¿Qué *fecha* sale el viaje? (ej: 25/08/2026, mañana, 2026-09-10)",
      ];
    }

    case "awaiting_date": {
      const date = parseTravelDate(text);
      if (!date) {
        return [
          "No entendí la fecha. Probá con formato *DD/MM/AAAA* o escribí *mañana*.",
        ];
      }
      state.draft.date = date;
      state.step = "awaiting_route";
      saveConversation(state);
      return [
        "Genial.",
        "¿Cuál es el *origen y destino*?",
        "Ejemplos: `Buenos Aires → Mar del Plata` o `CABA a Bariloche ida y vuelta`",
      ];
    }

    case "awaiting_route": {
      const route = parseRoute(text);
      if (!route) {
        return [
          "Necesito origen y destino. Ejemplo: *Buenos Aires a Mendoza* o solo el destino (*Pinamar*).",
        ];
      }
      state.draft.origin = route.origin;
      state.draft.destination = route.destination;
      state.draft.roundTrip = route.roundTrip;
      state.step = "awaiting_confirm";
      saveConversation(state);
      return [
        summaryDraft(state),
        "¿Confirmamos para calcular la estimación? Respondé *sí* o *no*.",
      ];
    }

    case "awaiting_confirm": {
      if (isNegative(text)) {
        clearConversation(state.phone);
        resetConversation(state.phone);
        return [
          "Sin problema, arrancamos de nuevo.",
          "¿Cómo es tu *nombre*?",
        ];
      }
      if (!isAffirmative(text)) {
        return ["Respondé *sí* para estimar el precio, o *no* para reiniciar."];
      }

      const estimate = estimatePrice({
        passengers: state.draft.passengers ?? 0,
        destinationText: state.draft.destination ?? "",
        originText: state.draft.origin,
        roundTrip: state.draft.roundTrip,
      });

      if ("error" in estimate) {
        state.step = "done";
        saveConversation(state);
        await notifyLead(state, null, estimate.error);
        return [
          estimate.error,
          `También podés escribirnos al ${CONTACT.whatsappLabel} o completar el formulario web.`,
          "Si querés otra estimación, escribí *cotizar*.",
        ];
      }

      state.step = "done";
      saveConversation(state);
      await notifyLead(state, estimate);
      return [
        formatEstimateMessage(state, estimate),
        "Un asesor puede confirmarte el precio final.",
        "Para una nueva estimación escribí *cotizar*.",
      ];
    }

    case "done": {
      if (isRestart(text) || isAffirmative(text) || /cotizar|otra|nueva/i.test(text)) {
        resetConversation(state.phone);
        return [WELCOME];
      }
      return [
        "Si querés otra estimación, escribí *cotizar*.",
        `O hablá con el equipo al ${CONTACT.whatsappLabel}.`,
      ];
    }
  }
}

function summaryDraft(state: ConversationState): string {
  const d = state.draft;
  return [
    "Resumen:",
    `• Nombre: *${d.name}*`,
    `• Pasajeros: *${d.passengers}*`,
    `• Fecha: *${d.date}*`,
    `• Ruta: *${d.origin} → ${d.destination}*${d.roundTrip ? " (ida y vuelta)" : ""}`,
  ].join("\n");
}

function formatEstimateMessage(
  state: ConversationState,
  estimate: PriceEstimate,
): string {
  return [
    summaryDraft(state),
    "",
    `Destino detectado: *${estimate.destinationLabel}* (~${estimate.estimatedKm} km)`,
    `Unidad sugerida: *${estimate.vehicle.name}*`,
    `Estimación: *${formatArs(estimate.amountMin)} – ${formatArs(estimate.amountMax)}*`,
    "",
    ...estimate.notes.map((note) => `• ${note}`),
  ].join("\n");
}

async function notifyLead(
  state: ConversationState,
  estimate: PriceEstimate | null,
  extraError?: string,
): Promise<void> {
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID?.trim();
  if (!formspreeId) return;

  const d = state.draft;
  const lines = [
    `Lead WhatsApp bot`,
    `Teléfono: ${state.phone}`,
    `Nombre: ${d.name ?? "-"}`,
    `Pasajeros: ${d.passengers ?? "-"}`,
    `Fecha: ${d.date ?? "-"}`,
    `Origen: ${d.origin ?? "-"}`,
    `Destino: ${d.destination ?? "-"}`,
    `Ida y vuelta: ${d.roundTrip ? "sí" : "no"}`,
  ];

  if (estimate) {
    lines.push(
      `Estimación: ${formatArs(estimate.amountMin)} - ${formatArs(estimate.amountMax)}`,
      `Unidad: ${estimate.vehicle.name}`,
      `Zona: ${estimate.destinationLabel}`,
    );
  }
  if (extraError) {
    lines.push(`Nota: ${extraError}`);
  }

  const payload = new FormData();
  payload.append("nombre", d.name ?? "WhatsApp lead");
  payload.append("telefono", state.phone);
  payload.append("email", "whatsapp-bot@laxmar.local");
  payload.append(
    "origenDestino",
    `${d.origin ?? "?"} → ${d.destination ?? "?"}`,
  );
  payload.append("fecha", d.date ?? "");
  payload.append("pasajeros", String(d.passengers ?? ""));
  payload.append("mensaje", lines.join("\n"));
  payload.append("consentimiento", "sí");
  payload.append("_subject", "Lead WhatsApp bot - Laxmar");

  try {
    await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: payload,
    });
  } catch {
    // No bloquear al usuario si falla la notificación.
  }
}

function capitalizeName(value: string): string {
  return value
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}
