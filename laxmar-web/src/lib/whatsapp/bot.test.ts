import { describe, expect, it } from "vitest";

import {
  isAffirmative,
  parsePassengers,
  parseRoute,
  parseTravelDate,
} from "./parser";
import { handleIncomingMessage } from "./bot";
import { clearConversation } from "./store";

describe("whatsapp parser", () => {
  it("parsea pasajeros y rutas", () => {
    expect(parsePassengers("somos 20 personas")).toBe(20);
    expect(parseRoute("Buenos Aires → Mar del Plata")).toEqual({
      origin: "Buenos Aires",
      destination: "Mar del Plata",
      roundTrip: false,
    });
    expect(parseRoute("CABA a Mendoza ida y vuelta")?.roundTrip).toBe(true);
  });

  it("parsea fechas relativas y absolutas", () => {
    const now = new Date(2026, 7, 12);
    expect(parseTravelDate("mañana", now)).toBe("2026-08-13");
    expect(parseTravelDate("25/08/2026", now)).toBe("2026-08-25");
    expect(isAffirmative("sí")).toBe(true);
    expect(isAffirmative("si dale")).toBe(true);
  });
});

describe("whatsapp bot flow", () => {
  it("completa una cotización estimada", async () => {
    const phone = "5491100000000";
    clearConversation(phone);

    const r1 = await handleIncomingMessage({ from: phone, text: "hola" });
    expect(r1.messages.join(" ")).toMatch(/nombre/i);

    await handleIncomingMessage({ from: phone, text: "Ana Lopez" });
    await handleIncomingMessage({ from: phone, text: "18" });
    await handleIncomingMessage({ from: phone, text: "20/09/2026" });
    await handleIncomingMessage({
      from: phone,
      text: "Buenos Aires a Mar del Plata",
    });
    const confirm = await handleIncomingMessage({ from: phone, text: "si" });

    const text = confirm.messages.join("\n");
    expect(text).toMatch(/Estimación/i);
    expect(text).toMatch(/Sprinter|Hiace|Mini-Bus|Bus/i);
  });
});
