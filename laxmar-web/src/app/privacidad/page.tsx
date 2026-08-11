import type { Metadata } from "next";
import Link from "next/link";

import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Privacidad",
  description:
    "Cómo Laxmar trata los datos personales enviados desde el formulario de cotización.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-laxmar-green">
        Legal
      </p>
      <h1 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
        Privacidad de datos
      </h1>
      <p className="mt-4 text-muted-foreground">
        Última actualización: agosto 2026
      </p>

      <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground">
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Qué datos pedimos</h2>
          <p className="text-muted-foreground">
            En el formulario de cotización podemos solicitar nombre, teléfono,
            correo electrónico, origen y destino, fecha de viaje, cantidad de
            pasajeros y un mensaje opcional.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Para qué los usamos</h2>
          <p className="text-muted-foreground">
            Los datos se usan únicamente para responder tu consulta, armar una
            cotización y coordinar el servicio de traslado. No los vendemos ni
            los cedemos con fines comerciales a terceros.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Cómo los tratamos</h2>
          <p className="text-muted-foreground">
            El envío del formulario se procesa a través de Formspree y llega al
            correo de contacto de Laxmar ({CONTACT.email}). También podés
            escribirnos por WhatsApp al {CONTACT.whatsappLabel}.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Conservación y derechos</h2>
          <p className="text-muted-foreground">
            Conservamos la información el tiempo necesario para gestionar la
            cotización y el servicio. Podés pedir acceso, actualización o baja
            de tus datos escribiendo a{" "}
            <a
              href={`mailto:${CONTACT.email}`}
              className="font-medium text-laxmar-green hover:underline"
            >
              {CONTACT.email}
            </a>
            .
          </p>
        </section>
      </div>

      <div className="mt-12">
        <Link
          href="/#contacto"
          className="inline-flex h-11 items-center rounded-md bg-laxmar-green px-5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Volver al formulario
        </Link>
      </div>
    </main>
  );
}
