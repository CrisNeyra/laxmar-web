"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CalendarClock, MessageSquare, Route } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Step = {
  step: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    step: "01",
    icon: MessageSquare,
    title: "Cotizás",
    description:
      "Contanos origen, destino, fecha y cantidad de pasajeros. Respondemos rápido con la mejor opción.",
  },
  {
    step: "02",
    icon: CalendarClock,
    title: "Coordinamos",
    description:
      "Asignamos la unidad ideal y un conductor habilitado. Confirmamos cada detalle del itinerario con vos.",
  },
  {
    step: "03",
    icon: Route,
    title: "Viajás tranquilo",
    description:
      "Seguimiento satelital del viaje y soporte 24/7. Vos disfrutás, nosotros nos ocupamos del resto.",
  },
];

export function ProcessSection() {
  return (
    <section
      id="proceso"
      className="relative min-h-[640px] w-full overflow-hidden bg-background py-20 md:min-h-[720px] md:py-28"
    >
      <Image
        src="/images/coordinar-laxmar.jpg"
        alt=""
        fill
        aria-hidden="true"
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-white/30 dark:bg-background/35" />
      {/* Degradés suaves y más cortos para no tapar la foto */}
      <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-background/90 to-transparent md:h-14" />
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background/90 to-transparent md:h-14" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-laxmar-green">
            Cómo trabajamos
          </p>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-5xl">
            Tres pasos y estás en ruta
          </h2>
          <p className="mt-4 text-base text-black md:text-lg">
            Un proceso simple y transparente desde el primer mensaje hasta que
            llegás a destino.
          </p>
        </div>

        <div className="relative mt-14 grid gap-8 md:grid-cols-3">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-laxmar-green/40 to-transparent md:block"
          />

          {steps.map((step, idx) => (
            <motion.article
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: idx * 0.12,
                ease: "easeOut",
              }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-laxmar-green bg-background text-laxmar-green shadow-sm">
                <step.icon className="h-7 w-7" />
              </div>
              <span className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-black">
                Paso {step.step}
              </span>
              <h3 className="mt-2 text-xl font-semibold text-black">
                {step.title}
              </h3>
              <p className="mt-3 max-w-sm text-sm text-black md:text-base">
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
