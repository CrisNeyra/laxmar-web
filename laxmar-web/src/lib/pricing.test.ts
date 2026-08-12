import { describe, expect, it } from "vitest";

import {
  estimatePrice,
  formatArs,
  matchDestination,
  pickVehicle,
} from "./pricing";

describe("pickVehicle", () => {
  it("elige unidad según pasajeros", () => {
    expect(pickVehicle(10)?.id).toBe("hiace");
    expect(pickVehicle(15)?.id).toBe("sprinter");
    expect(pickVehicle(22)?.id).toBe("minibus");
    expect(pickVehicle(40)?.id).toBe("bus");
    expect(pickVehicle(50)).toBeNull();
  });
});

describe("matchDestination", () => {
  it("detecta destinos por keywords", () => {
    expect(matchDestination("Buenos Aires a Mar del Plata")?.id).toBe("costa");
    expect(matchDestination("viaje a Bariloche")?.id).toBe("patagonia");
    expect(matchDestination("Ezeiza")?.id).toBe("caba");
  });
});

describe("estimatePrice", () => {
  it("devuelve rango de precio orientativo", () => {
    const estimate = estimatePrice({
      passengers: 18,
      destinationText: "Pinamar",
      originText: "CABA",
    });

    expect("error" in estimate).toBe(false);
    if ("error" in estimate) return;

    expect(estimate.vehicle.id).toBe("sprinter");
    expect(estimate.amountMax).toBeGreaterThan(estimate.amountMin);
    expect(formatArs(estimate.amountMin)).toContain("$");
  });

  it("marca error si no reconoce destino", () => {
    const estimate = estimatePrice({
      passengers: 10,
      destinationText: "Atlantis XYZ",
    });
    expect("error" in estimate).toBe(true);
  });
});
