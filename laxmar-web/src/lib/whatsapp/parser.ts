import { digitsOnly } from "@/lib/submit-contact";

export function parsePassengers(text: string): number | null {
  const match = text.match(/(\d{1,2})/);
  if (!match) return null;
  const value = Number(match[1]);
  if (!Number.isInteger(value) || value < 1 || value > 45) return null;
  return value;
}

export function parseTravelDate(text: string, now = new Date()): string | null {
  const cleaned = text.trim().toLowerCase();

  if (cleaned.includes("pasado mañana") || cleaned.includes("pasado manana")) {
    return shiftDays(now, 2);
  }
  if (cleaned.includes("mañana") || cleaned.includes("manana")) {
    return shiftDays(now, 1);
  }
  if (cleaned === "hoy") {
    return shiftDays(now, 0);
  }

  const iso = cleaned.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) {
    return `${iso[1]}-${iso[2]}-${iso[3]}`;
  }

  const slash = cleaned.match(/^(\d{1,2})[\/\-.](\d{1,2})(?:[\/\-.](\d{2,4}))?$/);
  if (!slash) return null;

  const day = Number(slash[1]);
  const month = Number(slash[2]);
  let year = slash[3] ? Number(slash[3]) : now.getFullYear();
  if (year < 100) year += 2000;

  if (month < 1 || month > 12 || day < 1 || day > 31) return null;

  const candidate = new Date(year, month - 1, day);
  if (
    candidate.getFullYear() !== year ||
    candidate.getMonth() !== month - 1 ||
    candidate.getDate() !== day
  ) {
    return null;
  }

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (candidate < today) {
    if (!slash[3]) {
      return formatISO(new Date(year + 1, month - 1, day));
    }
    return null;
  }

  return formatISO(candidate);
}

export function parseRoute(text: string): {
  origin: string;
  destination: string;
  roundTrip: boolean;
} | null {
  const cleaned = text.trim().replace(/\s+/g, " ");
  const roundTrip = /ida\s*y\s*vuelta|round\s*trip|iyv/i.test(cleaned);

  const match = cleaned.match(
    /^(.+?)\s*(?:→|->| a | al | hacia | hasta )\s*(.+)$/i,
  );

  if (!match) {
    if (cleaned.length < 3) return null;
    return {
      origin: "Buenos Aires",
      destination: cleaned.replace(/\b(ida\s*y\s*vuelta|round\s*trip|iyv)\b/gi, "").trim(),
      roundTrip,
    };
  }

  const origin = match[1].trim();
  const destination = match[2]
    .replace(/\b(ida\s*y\s*vuelta|round\s*trip|iyv)\b/gi, "")
    .trim();

  if (origin.length < 2 || destination.length < 2) return null;
  return { origin, destination, roundTrip };
}

export function isAffirmative(text: string): boolean {
  const value = text.trim().toLowerCase();
  return /^(si|sí|ok|dale|confirmo|perfecto|yes|de acuerdo)\b/i.test(
    value.normalize("NFC"),
  ) || /^(si|sí)([,\s]|$)/i.test(value);
}

export function isNegative(text: string): boolean {
  const value = text.trim().toLowerCase();
  return /^(no|nop|cancelar|reiniciar|empezar|otra)\b/.test(value);
}

export function isRestart(text: string): boolean {
  const value = text.trim().toLowerCase();
  return /^(hola|menu|menú|reiniciar|empezar|cotizar|nueva cotizacion|nueva cotización)$/.test(
    value,
  );
}

export function looksLikeName(text: string): boolean {
  const cleaned = text.trim();
  if (cleaned.length < 2 || cleaned.length > 60) return false;
  if (digitsOnly(cleaned).length >= 6) return false;
  return /[a-záéíóúñ]/i.test(cleaned);
}

function shiftDays(now: Date, days: number): string {
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + days);
  return formatISO(date);
}

function formatISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
