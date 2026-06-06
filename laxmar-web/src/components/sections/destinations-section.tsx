"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin } from "lucide-react";

type Region = {
  name: string;
  destinations: { city: string; province: string }[];
};

const regions: Region[] = [
  {
    name: "Costa Atlántica",
    destinations: [
      { city: "Mar del Plata", province: "Buenos Aires" },
      { city: "Pinamar", province: "Buenos Aires" },
      { city: "Villa Gesell", province: "Buenos Aires" },
      { city: "Mar de Ajó", province: "Buenos Aires" },
      { city: "Necochea", province: "Buenos Aires" },
    ],
  },
  {
    name: "Sierras y Centro",
    destinations: [
      { city: "Tandil", province: "Buenos Aires" },
      { city: "Sierra de la Ventana", province: "Buenos Aires" },
      { city: "Córdoba Capital", province: "Córdoba" },
      { city: "Villa Carlos Paz", province: "Córdoba" },
      { city: "Mina Clavero", province: "Córdoba" },
    ],
  },
  {
    name: "Norte Argentino",
    destinations: [
      { city: "Salta", province: "Salta" },
      { city: "San Salvador de Jujuy", province: "Jujuy" },
      { city: "San Miguel de Tucumán", province: "Tucumán" },
      { city: "Cafayate", province: "Salta" },
      { city: "Purmamarca", province: "Jujuy" },
    ],
  },
  {
    name: "Patagonia",
    destinations: [
      { city: "San Carlos de Bariloche", province: "Río Negro" },
      { city: "San Martín de los Andes", province: "Neuquén" },
      { city: "Villa La Angostura", province: "Neuquén" },
      { city: "El Bolsón", province: "Río Negro" },
      { city: "Puerto Madryn", province: "Chubut" },
    ],
  },
  {
    name: "Cuyo y Litoral",
    destinations: [
      { city: "Mendoza", province: "Mendoza" },
      { city: "San Juan", province: "San Juan" },
      { city: "Puerto Iguazú", province: "Misiones" },
      { city: "Rosario", province: "Santa Fe" },
      { city: "San Rafael", province: "Mendoza" },
    ],
  },
  {
    name: "Uruguay",
    destinations: [
      { city: "Montevideo", province: "Montevideo" },
      { city: "Punta del Este", province: "Maldonado" },
      { city: "Colonia del Sacramento", province: "Colonia" },
      { city: "Piriápolis", province: "Maldonado" },
      { city: "Salto", province: "Salto" },
    ],
  },
];

export function DestinationsSection() {
  return (
    <section
      id="destinos"
      className="relative w-full overflow-hidden bg-background py-20 md:py-28"
    >
      <Image
        src="/images/argentina-satelital.jpg"
        alt=""
        fill
        aria-hidden="true"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-white/80 dark:bg-background/85" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-laxmar-green">
            Destinos
          </p>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-5xl">
            Recorremos Argentina y Uruguay
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Desde la Costa Atlántica hasta la Patagonia, y cruzando a Uruguay,
            planificamos cada recorrido con paradas estratégicas y conductores
            que conocen la ruta.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((region, regionIdx) => (
            <motion.article
              key={region.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: regionIdx * 0.06,
                ease: "easeOut",
              }}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-laxmar-green/50 hover:shadow-lg"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-laxmar-green/10 text-laxmar-green transition-colors group-hover:bg-laxmar-green group-hover:text-white">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {region.name}
                </h3>
              </div>
              <ul className="space-y-2.5">
                {region.destinations.map((destination) => (
                  <li
                    key={destination.city}
                    className="flex items-baseline justify-between gap-3 text-sm"
                  >
                    <span className="font-medium text-foreground">
                      {destination.city}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {destination.province}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          ¿No ves tu destino?{" "}
          <a
            href="#contacto"
            className="font-semibold text-laxmar-green hover:underline"
          >
            Consultanos
          </a>
          , cubrimos rutas a medida en todo el país.
        </p>
      </div>
    </section>
  );
}
