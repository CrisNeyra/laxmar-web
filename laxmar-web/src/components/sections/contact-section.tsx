"use client";

import { Mail, MapPin, Phone, Send } from "lucide-react";
import Image from "next/image";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
} from "@/components/ui/social-icons";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT, whatsappLink } from "@/lib/contact";

const inputClass = "h-11";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "";
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`;

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const submitting = status === "submitting";

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.append("_subject", "Cotización de viaje - Laxmar");

    setStatus("submitting");

    if (!FORMSPREE_ID) {
      const lines = [
        `Nombre: ${data.get("nombre") ?? ""}`,
        `Teléfono: ${data.get("telefono") ?? ""}`,
        `Email: ${data.get("email") ?? ""}`,
        `Origen → Destino: ${data.get("origenDestino") ?? ""}`,
        `Fecha: ${data.get("fecha") ?? ""}`,
        `Pasajeros: ${data.get("pasajeros") ?? ""}`,
        "",
        "Mensaje:",
        `${data.get("mensaje") ?? ""}`,
      ].join("\n");
      const subject = encodeURIComponent("Cotización de viaje - Laxmar");
      const body = encodeURIComponent(lines);
      window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
      setStatus("idle");
      return;
    }

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (response.ok) {
        form.reset();
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contacto"
      className="relative w-full overflow-hidden bg-background py-20 md:py-28"
    >
      <Image
        src="/images/contacto-laxmar.jpg"
        alt=""
        fill
        aria-hidden="true"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-white/50 dark:bg-background/50" />
      {/* Gradientes para fundir suavemente los bordes de la imagen */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent md:h-32" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent md:h-32" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-laxmar-green">
            Contacto
          </p>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-5xl">
            Pedinos tu cotización
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Respondemos rápido. Contanos tu viaje y te armamos la mejor opción.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8 lg:col-span-3"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="nombre" className="text-sm font-medium text-foreground">
                  Nombre y apellido
                </label>
                <Input
                  id="nombre"
                  name="nombre"
                  required
                  placeholder="Juan Pérez"
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="telefono" className="text-sm font-medium text-foreground">
                  Teléfono
                </label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  required
                  placeholder="+54 9 11 0000-0000"
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Correo electrónico
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="vos@email.com"
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label
                  htmlFor="origenDestino"
                  className="text-sm font-medium text-foreground"
                >
                  Origen y destino
                </label>
                <Input
                  id="origenDestino"
                  name="origenDestino"
                  required
                  placeholder="Ej: Buenos Aires → Mar del Plata"
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="fecha" className="text-sm font-medium text-foreground">
                  Fecha de viaje
                </label>
                <Input
                  id="fecha"
                  name="fecha"
                  type="date"
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="pasajeros" className="text-sm font-medium text-foreground">
                  Pasajeros
                </label>
                <Input
                  id="pasajeros"
                  name="pasajeros"
                  type="number"
                  min={1}
                  placeholder="Ej: 20"
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label htmlFor="mensaje" className="text-sm font-medium text-foreground">
                  Mensaje
                </label>
                <Textarea
                  id="mensaje"
                  name="mensaje"
                  placeholder="Contanos más sobre tu viaje, paradas, horarios…"
                  className="min-h-32"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="mt-6 h-12 w-full bg-laxmar-green text-white hover:opacity-90"
              disabled={submitting}
            >
              <Send className="h-4 w-4" />
              {submitting ? "Enviando..." : "Enviar consulta"}
            </Button>

            {status === "success" && (
              <p className="mt-3 rounded-md bg-laxmar-green/10 px-4 py-3 text-center text-sm font-medium text-laxmar-green">
                ¡Gracias! Recibimos tu consulta y te vamos a contactar a la
                brevedad.
              </p>
            )}
            {status === "error" && (
              <p className="mt-3 rounded-md bg-destructive/10 px-4 py-3 text-center text-sm font-medium text-red-600">
                Hubo un problema al enviar. Probá de nuevo o escribinos por
                WhatsApp.
              </p>
            )}

            <p className="mt-3 text-center text-xs text-muted-foreground">
              También podés escribirnos por{" "}
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-laxmar-green hover:underline"
              >
                WhatsApp
              </a>{" "}
              y te respondemos al instante.
            </p>
          </form>

          <aside className="space-y-4 lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground">
                Hablá con nosotros
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Estamos disponibles para coordinar tu viaje.
              </p>

              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-laxmar-green/10 text-laxmar-green">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Email
                    </p>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="font-medium text-foreground hover:text-laxmar-green"
                    >
                      {CONTACT.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-laxmar-green/10 text-laxmar-green">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Teléfono
                    </p>
                    <a
                      href={`tel:${CONTACT.phoneHref}`}
                      className="font-medium text-foreground hover:text-laxmar-green"
                    >
                      {CONTACT.phoneLabel}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-laxmar-green/10 text-laxmar-green">
                    <WhatsAppIcon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      WhatsApp
                    </p>
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-foreground hover:text-laxmar-green"
                    >
                      {CONTACT.whatsappLabel}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-laxmar-green/10 text-laxmar-green">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Base operativa
                    </p>
                    <p className="font-medium text-foreground">{CONTACT.city}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground">
                Seguinos en redes
              </h3>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href={CONTACT.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-laxmar-green hover:text-laxmar-green"
                >
                  <InstagramIcon className="h-4 w-4" />
                  Instagram
                </a>
                <a
                  href={CONTACT.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-laxmar-green hover:text-laxmar-green"
                >
                  <FacebookIcon className="h-4 w-4" />
                  Facebook
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
