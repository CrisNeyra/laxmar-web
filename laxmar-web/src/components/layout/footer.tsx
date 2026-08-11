import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import {
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
} from "@/components/ui/social-icons";
import { CONTACT, whatsappLink } from "@/lib/contact";

const navItems = [
  { href: "#inicio", label: "Inicio" },
  { href: "#destinos", label: "Destinos" },
  { href: "#flota", label: "Flota" },
  { href: "#proceso", label: "Cómo trabajamos" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="w-full bg-laxmar-blue text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 md:grid-cols-3 md:px-6">
        <div className="space-y-3">
          <Link
            href="#inicio"
            className="text-2xl font-bold tracking-tight text-white"
          >
            LAX<span className="text-laxmar-green">MAR</span>
          </Link>
          <p className="max-w-xs text-sm text-white/75">
            Traslados de pasajeros provinciales y nacionales. Flota habilitada,
            conductores profesionales y soporte 24/7.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${CONTACT.instagramHandle}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={CONTACT.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Facebook ${CONTACT.facebookHandle}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escribinos por WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
            Navegación
          </h3>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-white/85 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
            Contacto
          </h3>
          <ul className="space-y-3 text-sm text-white/85">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-laxmar-green" />
              <a
                href={`mailto:${CONTACT.email}`}
                className="hover:text-white"
              >
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-laxmar-green" />
              <a
                href={`tel:${CONTACT.phoneHref}`}
                className="hover:text-white"
              >
                {CONTACT.phoneLabel}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-laxmar-green" />
              <span>{CONTACT.city}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/60 md:flex-row md:px-6">
          <p>© {new Date().getFullYear()} Laxmar. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacidad" className="hover:text-white">
              Privacidad
            </Link>
            <p>Hecho con cuidado en Argentina.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
