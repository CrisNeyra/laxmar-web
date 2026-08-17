"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "¿Con cuánta anticipación hay que reservar?",
    answer:
      "Lo ideal es consultar con la mayor anticipación posible. Para fechas pico (fines de semana largos, vacaciones y eventos) recomendamos escribirnos con varios días de anticipación para asegurar unidad disponible.",
  },
  {
    question: "¿Qué incluye la cotización?",
    answer:
      "La cotización contempla unidad habilitada, conductor profesional, peajes según el trayecto y el recorrido acordado. Si necesitás paradas extras, espera o cambios de itinerario, lo vemos al cotizar.",
  },
  {
    question: "¿Hacen viajes provinciales y nacionales?",
    answer:
      "Sí. Cubrimos traslados dentro de la provincia y a destinos de todo el país, para turismo, empresas, colegios, delegaciones y eventos.",
  },
  {
    question: "¿Qué capacidad tienen las unidades?",
    answer:
      "Trabajamos con flota de hasta 20 pasajeros: Toyota Hiace y Mercedes-Benz Sprinter. Te sugerimos la unidad según cantidad de pasajeros, equipaje y tipo de viaje.",
  },
  {
    question: "¿Cómo se confirma y se paga?",
    answer:
      "Después de enviarte la cotización, coordinamos la reserva y las condiciones de pago. Ante cualquier duda, escribinos por WhatsApp y te guiamos paso a paso.",
  },
] as const;

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="w-full bg-muted/30 py-20 md:py-28">
      <div className="mx-auto w-full max-w-3xl px-4 md:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-laxmar-green">
            Preguntas frecuentes
          </p>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-5xl">
            Todo lo que necesitás saber
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Si no encontrás tu respuesta, escribinos y te respondemos a la
            brevedad.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-border bg-card"
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-base font-semibold text-foreground md:text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-laxmar-green transition-transform",
                      open && "rotate-180",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-muted-foreground md:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
