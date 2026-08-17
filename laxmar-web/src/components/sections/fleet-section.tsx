import Image from "next/image";
import {
  BadgeCheck,
  FileCheck2,
  ShieldCheck,
  Signal,
  Snowflake,
  Users,
  Van,
  Wifi,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type FleetUnit = {
  icon: LucideIcon;
  name: string;
  capacity: string;
  features: string[];
  highlight?: boolean;
};

const fleet: FleetUnit[] = [
  {
    icon: Van,
    name: "Mercedes-Benz Sprinter 517 2026",
    capacity: "19 pasajeros",
    features: ["A/C", "Cinturones", "Valijero", "Ideal grupos medianos"],
    highlight: true,
  },
  {
    icon: Van,
    name: "Mercedes-Benz Sprinter 517 2020",
    capacity: "19 pasajeros",
    features: ["A/C dual", "USB", "Butacas reclinables", "Equipaje amplio"],
  },
  {
    icon: Van,
    name: "IVECO Daily",
    capacity: "19 pasajeros",
    features: ["A/C", "Cinturones", "Porta-equipaje", "Ideal grupos chicos"],
  },
];

const trustItems = [
  {
    icon: BadgeCheck,
    name: "Empresa habilitada",
    detail: "Operación 100% formal y registrada.",
  },
  {
    icon: FileCheck2,
    name: "Certificación CNRT",
    detail: "Conductores y unidades en regla.",
  },
  {
    icon: ShieldCheck,
    name: "Seguros vigentes",
    detail: "Cobertura integral en cada viaje.",
  },
  {
    icon: Signal,
    name: "Rastreo satelital",
    detail: "Monitoreo de cada unidad en ruta.",
  },
];

const amenityIcons = [
  { icon: Snowflake, label: "Aire acondicionado" },
  { icon: Wifi, label: "Conectividad" },
  { icon: Users, label: "Conductores profesionales" },
];

export function FleetSection() {
  return (
    <section
      id="flota"
      className="relative w-full overflow-hidden bg-muted/40 py-20 md:py-28"
    >
      <Image
        src="/images/flota-laxmar.jpg"
        alt=""
        fill
        sizes="100vw"
        quality={70}
        aria-hidden="true"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-white/50" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent md:h-32" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent md:h-32" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-laxmar-green">
            Nuestra flota
          </p>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-5xl">
            Unidades equipadas para cada viaje
          </h2>
          <p className="mt-4 text-base text-foreground md:text-lg">
            De hasta 19 pasajeros. Mantenimiento riguroso y conductores
            habilitados para que vos sólo te preocupes por disfrutar el destino.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fleet.map((unit) => (
            <article
              key={unit.name}
              className={`relative flex flex-col gap-4 rounded-2xl border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg ${
                unit.highlight
                  ? "border-laxmar-green/60 shadow-md"
                  : "border-border"
              }`}
            >
              {unit.highlight && (
                <span className="absolute right-4 top-4 rounded-full bg-laxmar-green/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-laxmar-green">
                  Más solicitada
                </span>
              )}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <unit.icon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {unit.name}
                </h3>
                <p className="text-sm text-laxmar-green">{unit.capacity}</p>
              </div>
              <ul className="mt-1 space-y-1.5 text-sm text-muted-foreground">
                {unit.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-laxmar-green" />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-foreground">
          {amenityIcons.map((amenity) => (
            <div key={amenity.label} className="flex items-center gap-2">
              <amenity.icon className="h-4 w-4 text-laxmar-green" />
              <span>{amenity.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <article
              key={item.name}
              className="flex gap-3 rounded-xl border border-border bg-card p-4"
            >
              <item.icon className="h-7 w-7 shrink-0 text-laxmar-green" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {item.name}
                </p>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
