"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";

import {
  ArgentinaLocationFields,
  type LocationValue,
} from "@/components/ui/argentina-location-fields";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
} from "@/components/ui/social-icons";
import { Textarea } from "@/components/ui/textarea";
import { formatOriginDestination } from "@/lib/argentina-geo";
import { CONTACT, whatsappLink } from "@/lib/contact";
import {
  buildMailtoUrl,
  parseFormData,
  submitContactForm,
  todayISODate,
  validateContactForm,
  type FieldErrors,
  type SubmitStatus,
} from "@/lib/submit-contact";
import { cn } from "@/lib/utils";

const inputClass = "h-11";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "";

const emptyLocation: LocationValue = {
  provinceId: "",
  provinceName: "",
  localityId: "",
  localityName: "",
};

type TripTab = "origen" | "destino";

export function ContactSection() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [activeTab, setActiveTab] = useState<TripTab>("origen");
  const [origin, setOrigin] = useState<LocationValue>(emptyLocation);
  const [destination, setDestination] = useState<LocationValue>(emptyLocation);
  const submitting = status === "submitting";
  const minDate = useMemo(() => todayISODate(), []);

  const tripSummary = formatOriginDestination(
    origin.provinceName,
    origin.localityName,
    destination.provinceName,
    destination.localityName,
  );

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const parsed = parseFormData(data);
    const nextErrors = validateContactForm(parsed);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      if (nextErrors.origen) setActiveTab("origen");
      else if (nextErrors.destino) setActiveTab("destino");
      setStatus("idle");
      return;
    }

    setErrors({});
    setStatus("submitting");

    if (!FORMSPREE_ID) {
      window.location.href = buildMailtoUrl(parsed);
      setStatus("idle");
      return;
    }

    const result = await submitContactForm(data, FORMSPREE_ID);

    if (result === "success") {
      form.reset();
      setOrigin(emptyLocation);
      setDestination(emptyLocation);
      setActiveTab("origen");
      setStatus("success");
      return;
    }

    if (result === "spam") {
      form.reset();
      setOrigin(emptyLocation);
      setDestination(emptyLocation);
      setStatus("idle");
      return;
    }

    if (result === "invalid") {
      setErrors(validateContactForm(parseFormData(data)));
      setStatus("idle");
      return;
    }

    setStatus("error");
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
            Contacto
          </p>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-5xl">
            Pedinos tu cotización
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Respondemos en el día. Contanos tu viaje y te armamos la mejor opción.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <form
            onSubmit={onSubmit}
            noValidate
            className="relative rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8 lg:col-span-3"
          >
            <div className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
              <label htmlFor="_gotcha">No completar este campo</label>
              <input
                id="_gotcha"
                name="_gotcha"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <input type="hidden" name="origenProvincia" value={origin.provinceName} />
            <input type="hidden" name="origenLocalidad" value={origin.localityName} />
            <input type="hidden" name="destinoProvincia" value={destination.provinceName} />
            <input type="hidden" name="destinoLocalidad" value={destination.localityName} />
            <input type="hidden" name="origenDestino" value={tripSummary} />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="nombre" className="text-sm font-medium text-foreground">
                  Nombre y apellido
                </label>
                <Input
                  id="nombre"
                  name="nombre"
                  required
                  autoComplete="name"
                  placeholder="Juan Pérez"
                  className={inputClass}
                  aria-invalid={Boolean(errors.nombre)}
                />
                {errors.nombre && <FieldError message={errors.nombre} />}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="telefono" className="text-sm font-medium text-foreground">
                  Teléfono
                </label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  placeholder="+54 9 11 0000-0000"
                  className={inputClass}
                  aria-invalid={Boolean(errors.telefono)}
                />
                {errors.telefono && <FieldError message={errors.telefono} />}
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Correo electrónico
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  placeholder="vos@email.com"
                  className={inputClass}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <FieldError message={errors.email} />}
              </div>

              <div className="space-y-3 sm:col-span-2">
                <div
                  role="tablist"
                  aria-label="Origen y destino"
                  className="grid grid-cols-2 gap-2 rounded-lg bg-muted p-1"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "origen"}
                    id="tab-origen"
                    aria-controls="panel-origen"
                    onClick={() => setActiveTab("origen")}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-semibold transition",
                      activeTab === "origen"
                        ? "bg-background text-foreground shadow-[0_0_0_2px_rgba(44,159,133,0.35),0_0_18px_rgba(44,159,133,0.45)] ring-2 ring-laxmar-green/50"
                        : "bg-transparent text-muted-foreground hover:text-foreground",
                    )}
                  >
                    Origen
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "destino"}
                    id="tab-destino"
                    aria-controls="panel-destino"
                    onClick={() => setActiveTab("destino")}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-semibold transition",
                      activeTab === "destino"
                        ? "bg-laxmar-blue text-white shadow-[0_0_0_2px_rgba(21,36,72,0.35),0_0_20px_rgba(44,159,133,0.35),0_0_18px_rgba(21,36,72,0.55)] ring-2 ring-white/40"
                        : "bg-transparent text-muted-foreground hover:text-foreground",
                    )}
                  >
                    Destino
                  </button>
                </div>

                <div
                  id="panel-origen"
                  role="tabpanel"
                  aria-labelledby="tab-origen"
                  hidden={activeTab !== "origen"}
                >
                  <ArgentinaLocationFields
                    idPrefix="origen"
                    legend="Origen del viaje"
                    value={origin}
                    onChange={(next) => {
                      setOrigin(next);
                      if (next.provinceId && next.localityId) {
                        setActiveTab("destino");
                      }
                    }}
                    error={errors.origen}
                    disabled={submitting}
                  />
                </div>

                <div
                  id="panel-destino"
                  role="tabpanel"
                  aria-labelledby="tab-destino"
                  hidden={activeTab !== "destino"}
                >
                  <ArgentinaLocationFields
                    idPrefix="destino"
                    legend="Destino del viaje"
                    value={destination}
                    onChange={setDestination}
                    error={errors.destino}
                    disabled={submitting}
                  />
                </div>

                {tripSummary ? (
                  <p className="rounded-md bg-laxmar-green/10 px-3 py-2 text-sm text-foreground">
                    <span className="font-semibold text-laxmar-green">Ruta:</span>{" "}
                    {tripSummary}
                  </p>
                ) : null}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="fecha" className="text-sm font-medium text-foreground">
                  Fecha de viaje
                </label>
                <Input
                  id="fecha"
                  name="fecha"
                  type="date"
                  required
                  min={minDate}
                  className={inputClass}
                  aria-invalid={Boolean(errors.fecha)}
                />
                {errors.fecha && <FieldError message={errors.fecha} />}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="pasajeros" className="text-sm font-medium text-foreground">
                  Pasajeros
                </label>
                <Input
                  id="pasajeros"
                  name="pasajeros"
                  type="number"
                  inputMode="numeric"
                  required
                  min={1}
                  max={19}
                  placeholder="Ej: 12"
                  className={inputClass}
                  aria-invalid={Boolean(errors.pasajeros)}
                />
                {errors.pasajeros && <FieldError message={errors.pasajeros} />}
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
              <div className="space-y-1.5 sm:col-span-2">
                <label className="flex items-start gap-3 text-sm text-foreground">
                  <input
                    type="checkbox"
                    name="consentimiento"
                    value="on"
                    required
                    className="mt-1 h-4 w-4 rounded border-border accent-[hsl(var(--laxmar-green))]"
                    aria-invalid={Boolean(errors.consentimiento)}
                  />
                  <span>
                    Acepto que Laxmar me contacte por teléfono, WhatsApp o
                    email para responder esta cotización.{" "}
                    <Link
                      href="/privacidad"
                      className="font-semibold text-laxmar-green hover:underline"
                    >
                      Ver privacidad
                    </Link>
                    .
                  </span>
                </label>
                {errors.consentimiento && (
                  <FieldError message={errors.consentimiento} />
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="mt-6 h-12 w-full bg-laxmar-green text-white hover:opacity-90"
              disabled={submitting}
            >
              <Send className="h-4 w-4" />
              {submitting ? "Enviando..." : "Solicitar cotización"}
            </Button>

            {status === "success" && (
              <p
                role="alert"
                aria-live="polite"
                className="mt-3 rounded-md bg-laxmar-green/10 px-4 py-3 text-center text-sm font-medium text-laxmar-green"
              >
                ¡Gracias! Recibimos tu consulta y te vamos a contactar a la
                brevedad.
              </p>
            )}
            {status === "error" && (
              <p
                role="alert"
                aria-live="assertive"
                className="mt-3 rounded-md bg-destructive/10 px-4 py-3 text-center text-sm font-medium text-red-600"
              >
                Hubo un problema al enviar. Probá de nuevo o escribinos por
                WhatsApp.
              </p>
            )}

            {!FORMSPREE_ID && (
              <p className="mt-3 text-center text-xs text-amber-700">
                Formspree no está configurado: al enviar se abrirá tu correo.
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

function FieldError({ message }: { message: string }) {
  return (
    <p role="alert" className="text-xs font-medium text-red-600">
      {message}
    </p>
  );
}
