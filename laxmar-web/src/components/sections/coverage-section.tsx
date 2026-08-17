import {
  Briefcase,
  GraduationCap,
  Navigation,
  PartyPopper,
  Plane,
  Sun,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const services: Service[] = [
  {
    icon: Sun,
    title: "Turismo",
    description: "Excursiones, escapadas y viajes de placer.",
  },
  {
    icon: Briefcase,
    title: "Corporativo",
    description: "Traslados ejecutivos y staff de empresa.",
  },
  {
    icon: PartyPopper,
    title: "Eventos",
    description: "Casamientos, congresos y celebraciones.",
  },
  {
    icon: GraduationCap,
    title: "Escolares",
    description: "Viajes de estudio y egresados con seguridad.",
  },
  {
    icon: Plane,
    title: "Aeropuertos",
    description: "Pick-up y traslados in/out coordinados.",
  },
];

export function CoverageSection() {
  return (
    <section className="w-full bg-laxmar-blue py-20 text-white md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-laxmar-green">
              Cobertura
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
              Provincial y nacional, con base operativa en Mar del Plata
            </h2>
            <p className="mt-4 max-w-xl text-base text-white/80 md:text-lg">
              Diseñamos cada operativo a medida del cliente: viajes one-way,
              ida y vuelta, recorridos multi-destino y servicios recurrentes.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur">
              <Navigation className="h-4 w-4 text-laxmar-green" />
              Salidas desde todo el país
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur transition-colors hover:bg-white/10"
              >
                <service.icon className="mb-3 h-7 w-7 text-laxmar-green" />
                <h3 className="text-sm font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-1 text-xs text-white/70">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
