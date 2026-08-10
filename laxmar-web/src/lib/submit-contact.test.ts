import { describe, expect, it, vi } from "vitest";

import {
  buildMailtoUrl,
  isHoneypotFilled,
  parseFormData,
  submitContactForm,
} from "./submit-contact";

function createFormData(entries: Record<string, string>): FormData {
  const formData = new FormData();
  for (const [key, value] of Object.entries(entries)) {
    formData.append(key, value);
  }
  return formData;
}

describe("parseFormData", () => {
  it("extrae los campos del formulario", () => {
    const data = createFormData({
      nombre: "Juan Pérez",
      telefono: "+54 9 11 0000-0000",
      email: "juan@email.com",
      origenDestino: "Buenos Aires → Mar del Plata",
      fecha: "2026-09-01",
      pasajeros: "20",
      mensaje: "Viaje de empresa",
    });

    expect(parseFormData(data)).toEqual({
      nombre: "Juan Pérez",
      telefono: "+54 9 11 0000-0000",
      email: "juan@email.com",
      origenDestino: "Buenos Aires → Mar del Plata",
      fecha: "2026-09-01",
      pasajeros: "20",
      mensaje: "Viaje de empresa",
    });
  });
});

describe("buildMailtoUrl", () => {
  it("construye un mailto con asunto y cuerpo codificados", () => {
    const url = buildMailtoUrl({
      nombre: "Ana",
      telefono: "1111",
      email: "ana@email.com",
      origenDestino: "CABA → Córdoba",
      fecha: "2026-10-01",
      pasajeros: "15",
      mensaje: "Grupo corporativo",
    });

    expect(url).toContain("mailto:contacto@laxmar.com.ar");
    expect(url).toContain(encodeURIComponent("Cotización de viaje - Laxmar"));
    expect(url).toContain(encodeURIComponent("Ana"));
  });
});

describe("isHoneypotFilled", () => {
  it("detecta cuando el honeypot fue completado", () => {
    const data = createFormData({ _gotcha: "spam-bot" });
    expect(isHoneypotFilled(data)).toBe(true);
  });

  it("retorna false cuando el honeypot está vacío", () => {
    const data = createFormData({ nombre: "Juan" });
    expect(isHoneypotFilled(data)).toBe(false);
  });
});

describe("submitContactForm", () => {
  it("rechaza envíos con honeypot completado", async () => {
    const data = createFormData({
      nombre: "Bot",
      _gotcha: "filled",
    });

    const result = await submitContactForm(data, "test-id");
    expect(result).toBe("spam");
  });

  it("retorna error sin formspree id", async () => {
    const data = createFormData({ nombre: "Juan" });
    const result = await submitContactForm(data, "");
    expect(result).toBe("error");
  });

  it("retorna success cuando Formspree responde ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true }),
    );

    const data = createFormData({
      nombre: "Juan",
      email: "juan@email.com",
    });

    const result = await submitContactForm(data, "test-id");
    expect(result).toBe("success");

    vi.unstubAllGlobals();
  });

  it("retorna error cuando Formspree falla", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false }),
    );

    const data = createFormData({ nombre: "Juan" });
    const result = await submitContactForm(data, "test-id");
    expect(result).toBe("error");

    vi.unstubAllGlobals();
  });
});
