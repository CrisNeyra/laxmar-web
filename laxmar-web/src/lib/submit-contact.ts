import { CONTACT } from "./contact";

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

export type ContactFormData = {
  nombre: string;
  telefono: string;
  email: string;
  origenDestino: string;
  fecha: string;
  pasajeros: string;
  mensaje: string;
  consentimiento: boolean;
};

export type FieldErrors = Partial<
  Record<keyof ContactFormData | "form", string>
>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSENGERS = 1;
const MAX_PASSENGERS = 45;

export function todayISODate(now = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

export function parseFormData(formData: FormData): ContactFormData {
  return {
    nombre: String(formData.get("nombre") ?? "").trim(),
    telefono: String(formData.get("telefono") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    origenDestino: String(formData.get("origenDestino") ?? "").trim(),
    fecha: String(formData.get("fecha") ?? "").trim(),
    pasajeros: String(formData.get("pasajeros") ?? "").trim(),
    mensaje: String(formData.get("mensaje") ?? "").trim(),
    consentimiento:
      formData.get("consentimiento") === "on" ||
      formData.get("consentimiento") === "true" ||
      formData.get("consentimiento") === "1",
  };
}

export function validateContactForm(
  data: ContactFormData,
  now = new Date(),
): FieldErrors {
  const errors: FieldErrors = {};
  const minDate = todayISODate(now);

  if (data.nombre.length < 2) {
    errors.nombre = "Ingresá tu nombre y apellido.";
  }

  const phoneDigits = digitsOnly(data.telefono);
  if (phoneDigits.length < 8 || phoneDigits.length > 15) {
    errors.telefono = "Ingresá un teléfono válido (mínimo 8 dígitos).";
  }

  if (!EMAIL_RE.test(data.email)) {
    errors.email = "Ingresá un correo electrónico válido.";
  }

  if (data.origenDestino.length < 3) {
    errors.origenDestino = "Indicá origen y destino del viaje.";
  }

  if (!data.fecha) {
    errors.fecha = "Elegí la fecha de viaje.";
  } else if (data.fecha < minDate) {
    errors.fecha = "La fecha no puede ser anterior a hoy.";
  }

  const passengers = Number(data.pasajeros);
  if (
    !data.pasajeros ||
    !Number.isInteger(passengers) ||
    passengers < MIN_PASSENGERS ||
    passengers > MAX_PASSENGERS
  ) {
    errors.pasajeros = `Indicá entre ${MIN_PASSENGERS} y ${MAX_PASSENGERS} pasajeros.`;
  }

  if (!data.consentimiento) {
    errors.consentimiento =
      "Tenés que aceptar ser contactado para enviar la consulta.";
  }

  return errors;
}

export function buildMailtoUrl(data: ContactFormData): string {
  const lines = [
    `Nombre: ${data.nombre}`,
    `Teléfono: ${data.telefono}`,
    `Email: ${data.email}`,
    `Origen → Destino: ${data.origenDestino}`,
    `Fecha: ${data.fecha}`,
    `Pasajeros: ${data.pasajeros}`,
    `Consentimiento de contacto: sí`,
    "",
    "Mensaje:",
    data.mensaje,
  ].join("\n");
  const subject = encodeURIComponent("Cotización de viaje - Laxmar");
  const body = encodeURIComponent(lines);
  return `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
}

export function isHoneypotFilled(formData: FormData): boolean {
  return Boolean(String(formData.get("_gotcha") ?? "").trim());
}

export async function submitContactForm(
  formData: FormData,
  formspreeId: string,
): Promise<"success" | "error" | "spam" | "invalid"> {
  if (isHoneypotFilled(formData)) {
    return "spam";
  }

  const parsed = parseFormData(formData);
  const errors = validateContactForm(parsed);
  if (Object.keys(errors).length > 0) {
    return "invalid";
  }

  if (!formspreeId) {
    return "error";
  }

  const payload = new FormData();
  payload.append("nombre", parsed.nombre);
  payload.append("telefono", parsed.telefono);
  payload.append("email", parsed.email);
  payload.append("origenDestino", parsed.origenDestino);
  payload.append("fecha", parsed.fecha);
  payload.append("pasajeros", parsed.pasajeros);
  payload.append("mensaje", parsed.mensaje);
  payload.append("consentimiento", "sí");
  payload.append("_replyto", parsed.email);
  payload.append("_subject", "Cotización de viaje - Laxmar");

  try {
    const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: payload,
    });
    return response.ok ? "success" : "error";
  } catch {
    return "error";
  }
}
