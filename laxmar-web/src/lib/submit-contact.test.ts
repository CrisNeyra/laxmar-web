import { describe, expect, it, vi } from "vitest";

import {
  buildMailtoUrl,
  isHoneypotFilled,
  parseFormData,
  submitContactForm,
  todayISODate,
  validateContactForm,
} from "./submit-contact";

function createFormData(entries: Record<string, string>): FormData {
  const formData = new FormData();
  for (const [key, value] of Object.entries(entries)) {
    formData.append(key, value);
  }
  return formData;
}

const validPayload = {
  nombre: "Juan Pérez",
  telefono: "+54 9 11 6888-3430",
  email: "juan@email.com",
  origenDestino: "Buenos Aires → Mar del Plata",
  fecha: "2030-09-01",
  pasajeros: "20",
  mensaje: "Viaje de empresa",
  consentimiento: "on",
};

describe("parseFormData", () => {
  it("extrae los campos del formulario", () => {
    const data = createFormData(validPayload);

    expect(parseFormData(data)).toEqual({
      nombre: "Juan Pérez",
      telefono: "+54 9 11 6888-3430",
      email: "juan@email.com",
      origenDestino: "Buenos Aires → Mar del Plata",
      fecha: "2030-09-01",
      pasajeros: "20",
      mensaje: "Viaje de empresa",
      consentimiento: true,
    });
  });
});

describe("validateContactForm", () => {
  it("acepta un payload válido", () => {
    const errors = validateContactForm(parseFormData(createFormData(validPayload)));
    expect(errors).toEqual({});
  });

  it("rechaza teléfono corto, fecha pasada y sin consentimiento", () => {
    const errors = validateContactForm(
      parseFormData(
        createFormData({
          ...validPayload,
          telefono: "123",
          fecha: "2020-01-01",
          pasajeros: "0",
          consentimiento: "",
        }),
      ),
      new Date("2026-08-11"),
    );

    expect(errors.telefono).toBeTruthy();
    expect(errors.fecha).toBeTruthy();
    expect(errors.pasajeros).toBeTruthy();
    expect(errors.consentimiento).toBeTruthy();
  });
});

describe("todayISODate", () => {
  it("formatea la fecha local en YYYY-MM-DD", () => {
    expect(todayISODate(new Date("2026-08-11T15:00:00"))).toBe("2026-08-11");
  });
});

describe("buildMailtoUrl", () => {
  it("construye un mailto con asunto y cuerpo codificados", () => {
    const url = buildMailtoUrl({
      nombre: "Ana",
      telefono: "11112222",
      email: "ana@email.com",
      origenDestino: "CABA → Córdoba",
      fecha: "2026-10-01",
      pasajeros: "15",
      mensaje: "Grupo corporativo",
      consentimiento: true,
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
      ...validPayload,
      _gotcha: "filled",
    });

    const result = await submitContactForm(data, "test-id");
    expect(result).toBe("spam");
  });

  it("retorna invalid si faltan datos", async () => {
    const data = createFormData({
      nombre: "Juan",
      telefono: "123",
      email: "malo",
      origenDestino: "",
      fecha: "",
      pasajeros: "",
    });

    const result = await submitContactForm(data, "test-id");
    expect(result).toBe("invalid");
  });

  it("retorna error sin formspree id", async () => {
    const data = createFormData(validPayload);
    const result = await submitContactForm(data, "");
    expect(result).toBe("error");
  });

  it("retorna success cuando Formspree responde ok", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));

    const data = createFormData(validPayload);
    const result = await submitContactForm(data, "test-id");
    expect(result).toBe("success");

    vi.unstubAllGlobals();
  });

  it("retorna error cuando Formspree falla", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));

    const data = createFormData(validPayload);
    const result = await submitContactForm(data, "test-id");
    expect(result).toBe("error");

    vi.unstubAllGlobals();
  });
});
