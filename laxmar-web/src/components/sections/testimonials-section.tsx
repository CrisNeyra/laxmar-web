"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Contratamos a Laxmar para un viaje de egresados a Bariloche. Puntualidad perfecta, conductor súper atento y la unidad impecable. Volveríamos a elegirlos sin dudas.",
    author: "Mariana G.",
    role: "Coordinadora de turismo estudiantil",
  },
  {
    quote:
      "Coordinamos traslados ejecutivos semanales para nuestro equipo. Comunicación clara, facturación en regla y siempre llegan antes de hora.",
    author: "Federico R.",
    role: "Gerente de operaciones",
  },
  {
    quote:
      "Llevamos al club a un torneo nacional con 38 jugadores. Soporte 24/7 real, todo coordinado al detalle y precio justo. Recomendados.",
    author: "Diego M.",
    role: "Dirigente deportivo",
  },
];

const metrics = [
  { value: "+15", label: "Años en ruta" },
  { value: "+500", label: "Viajes por año" },
  { value: "100%", label: "Unidades habilitadas" },
  { value: "24/7", label: "Soporte real" },
];

export function TestimonialsSection() {
  return (
    <section className="w-full bg-muted/40 py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-laxmar-green">
            Testimonios
          </p>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-5xl">
            Empresas y grupos que ya viajaron con nosotros
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <motion.article
              key={testimonial.author}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              className="relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <Quote className="absolute right-5 top-5 h-8 w-8 text-laxmar-green/15" />
              <div className="mb-4 flex items-center gap-0.5 text-laxmar-green">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="flex-1 text-base leading-relaxed text-foreground">
                “{testimonial.quote}”
              </p>
              <footer className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-semibold text-foreground">
                  {testimonial.author}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role}
                </p>
              </footer>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col items-center justify-center bg-card px-4 py-8 text-center"
            >
              <span className="text-3xl font-bold text-laxmar-green md:text-4xl">
                {metric.value}
              </span>
              <span className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
