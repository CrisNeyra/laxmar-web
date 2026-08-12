export type VehicleId = "hiace" | "sprinter" | "minibus" | "bus";

export type VehicleQuote = {
  id: VehicleId;
  name: string;
  capacity: number;
  baseFee: number;
  perKm: number;
};

export type DestinationRate = {
  id: string;
  keywords: string[];
  label: string;
  estimatedKm: number;
};

/** Tarifas orientativas editables (ARS). No son precio final. */
export const VEHICLES: VehicleQuote[] = [
  { id: "hiace", name: "Toyota Hiace", capacity: 12, baseFee: 180_000, perKm: 950 },
  {
    id: "sprinter",
    name: "Mercedes-Benz Sprinter",
    capacity: 19,
    baseFee: 240_000,
    perKm: 1_100,
  },
  { id: "minibus", name: "Mini-Bus", capacity: 24, baseFee: 300_000, perKm: 1_250 },
  { id: "bus", name: "Bus larga distancia", capacity: 45, baseFee: 420_000, perKm: 1_450 },
];

export const DESTINATIONS: DestinationRate[] = [
  {
    id: "costa",
    keywords: [
      "mar del plata",
      "mdq",
      "pinamar",
      "gesell",
      "villa gesell",
      "necochea",
      "mar de ajo",
      "costa",
    ],
    label: "Costa Atlántica",
    estimatedKm: 400,
  },
  {
    id: "sierras",
    keywords: [
      "tandil",
      "sierra de la ventana",
      "cordoba",
      "córdoba",
      "carlos paz",
      "mina clavero",
    ],
    label: "Sierras / Centro",
    estimatedKm: 700,
  },
  {
    id: "norte",
    keywords: [
      "salta",
      "jujuy",
      "tucuman",
      "tucumán",
      "cafayate",
      "purmamarca",
    ],
    label: "Norte Argentino",
    estimatedKm: 1500,
  },
  {
    id: "patagonia",
    keywords: [
      "bariloche",
      "san martin de los andes",
      "san martín de los andes",
      "angostura",
      "el bolson",
      "el bolsón",
      "madryn",
      "patagonia",
    ],
    label: "Patagonia",
    estimatedKm: 1600,
  },
  {
    id: "cuyo",
    keywords: ["mendoza", "san juan", "san rafael", "iguazu", "iguazú", "rosario"],
    label: "Cuyo / Litoral",
    estimatedKm: 1100,
  },
  {
    id: "uruguay",
    keywords: [
      "montevideo",
      "punta del este",
      "colonia",
      "piriapolis",
      "piriápolis",
      "uruguay",
      "salto",
    ],
    label: "Uruguay",
    estimatedKm: 650,
  },
  {
    id: "caba",
    keywords: [
      "aeropuerto",
      "ezeiza",
      "aeroparque",
      "caba",
      "capital",
      "buenos aires",
      "amba",
    ],
    label: "CABA / AMBA / Aeropuertos",
    estimatedKm: 80,
  },
];

export type PriceEstimateInput = {
  passengers: number;
  destinationText: string;
  originText?: string;
  /** Ida y vuelta multiplica km por 2 */
  roundTrip?: boolean;
};

export type PriceEstimate = {
  vehicle: VehicleQuote;
  destinationLabel: string;
  estimatedKm: number;
  amountMin: number;
  amountMax: number;
  currency: "ARS";
  notes: string[];
};

export function pickVehicle(passengers: number): VehicleQuote | null {
  if (!Number.isFinite(passengers) || passengers < 1) return null;
  const vehicle = VEHICLES.find((item) => passengers <= item.capacity);
  return vehicle ?? null;
}

export function matchDestination(text: string): DestinationRate | null {
  const normalized = normalizeText(text);
  let best: DestinationRate | null = null;
  let bestScore = 0;

  for (const destination of DESTINATIONS) {
    for (const keyword of destination.keywords) {
      if (normalized.includes(normalizeText(keyword))) {
        const score = keyword.length;
        if (score > bestScore) {
          best = destination;
          bestScore = score;
        }
      }
    }
  }

  return best;
}

export function estimatePrice(input: PriceEstimateInput): PriceEstimate | { error: string } {
  const vehicle = pickVehicle(input.passengers);
  if (!vehicle) {
    return {
      error:
        "Para más de 45 pasajeros necesitamos coordinar una solución especial. Un asesor te va a contactar.",
    };
  }

  const destination =
    matchDestination(input.destinationText) ??
    matchDestination(`${input.originText ?? ""} ${input.destinationText}`);

  if (!destination) {
    return {
      error:
        "Todavía no pude ubicar ese destino en la tabla orientativa. Un asesor te cotiza a medida.",
    };
  }

  const km = destination.estimatedKm * (input.roundTrip ? 2 : 1);
  const raw = vehicle.baseFee + km * vehicle.perKm;
  const amountMin = Math.round(raw * 0.92);
  const amountMax = Math.round(raw * 1.12);

  return {
    vehicle,
    destinationLabel: destination.label,
    estimatedKm: km,
    amountMin,
    amountMax,
    currency: "ARS",
    notes: [
      "Estimación orientativa, no es cotización final.",
      "Puede variar por peajes, esperas, horarios nocturnos o fechas pico.",
      `Unidad sugerida: ${vehicle.name} (hasta ${vehicle.capacity} pasajeros).`,
    ],
  };
}

export function formatArs(amount: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(amount);
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}
