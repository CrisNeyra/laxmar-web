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
};

export function parseFormData(formData: FormData): ContactFormData {
  return {
    nombre: String(formData.get("nombre") ?? ""),
    telefono: String(formData.get("telefono") ?? ""),
    email: String(formData.get("email") ?? ""),
    origenDestino: String(formData.get("origenDestino") ?? ""),
    fecha: String(formData.get("fecha") ?? ""),
    pasajeros: String(formData.get("pasajeros") ?? ""),
    mensaje: String(formData.get("mensaje") ?? ""),
  };
}

export function buildMailtoUrl(data: ContactFormData): string {
  const lines = [
    `Nombre: ${data.nombre}`,
    `Teléfono: ${data.telefono}`,
    `Email: ${data.email}`,
    `Origen → Destino: ${data.origenDestino}`,
    `Fecha: ${data.fecha}`,
    `Pasajeros: ${data.pasajeros}`,
    "",
    "Mensaje:",
    data.mensaje,
  ].join("\n");
  const subject = encodeURIComponent("Cotización de viaje - Laxmar");
  const body = encodeURIComponent(lines);
  return `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
}

export function isHoneypotFilled(formData: FormData): boolean {
  return Boolean(formData.get("_gotcha"));
}

export async function submitContactForm(
  formData: FormData,
  formspreeId: string,
): Promise<"success" | "error" | "spam"> {
  if (isHoneypotFilled(formData)) {
    return "spam";
  }

  if (!formspreeId) {
    return "error";
  }

  const payload = new FormData();
  for (const [key, value] of formData.entries()) {
    if (key !== "_gotcha") {
      payload.append(key, value);
    }
  }
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
