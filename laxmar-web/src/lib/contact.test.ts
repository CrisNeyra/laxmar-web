import { describe, expect, it } from "vitest";

import { CONTACT, whatsappLink } from "./contact";

describe("whatsappLink", () => {
  it("genera la URL de WhatsApp con el mensaje por defecto", () => {
    const url = whatsappLink();
    expect(url).toContain(`https://wa.me/${CONTACT.whatsappNumber}`);
    expect(url).toContain(
      encodeURIComponent(CONTACT.whatsappMessage),
    );
  });

  it("acepta un mensaje personalizado", () => {
    const customMessage = "Hola, necesito cotizar un viaje";
    const url = whatsappLink(customMessage);
    expect(url).toContain(encodeURIComponent(customMessage));
  });
});

describe("CONTACT", () => {
  it("expone datos de contacto consistentes", () => {
    expect(CONTACT.email).toContain("@");
    expect(CONTACT.whatsappNumber).toMatch(/^\d+$/);
  });
});
