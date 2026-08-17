"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import { whatsappLink } from "@/lib/contact";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#inicio", label: "Inicio" },
  { href: "#destinos", label: "Destinos" },
  { href: "#flota", label: "Flota" },
  { href: "#proceso", label: "Cómo trabajamos" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-all",
        scrolled
          ? "border-border bg-background/95 backdrop-blur"
          : "border-transparent bg-background/70 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-24 w-full max-w-7xl items-center justify-between gap-3 px-4 md:px-6">
        <Link href="#inicio" className="flex shrink-0 items-center" aria-label="Laxmar - Inicio">
          <Image
            src="/images/logo-laxmar.png"
            alt="Laxmar"
            width={892}
            height={187}
            priority
            className="h-[3.54375rem] w-auto md:h-[5.0625rem]"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Principal">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground xl:text-base"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribinos por WhatsApp"
            className="hidden h-10 w-10 items-center justify-center rounded-md border border-border text-[#25D366] transition-colors hover:bg-muted sm:inline-flex"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          <Button asChild className="hidden bg-laxmar-green text-white hover:opacity-90 sm:inline-flex">
            <Link href="#contacto">Cotizar</Link>
          </Button>
          <Button
            ref={menuButtonRef}
            variant="outline"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div
        id="mobile-nav"
        ref={menuRef}
        className={cn(
          "overflow-hidden border-t border-border transition-all lg:hidden",
          open ? "max-h-96" : "max-h-0 border-transparent",
        )}
      >
        <nav className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-3" aria-label="Móvil">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contacto"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-md bg-laxmar-green px-3 py-2.5 text-center text-sm font-semibold text-white"
          >
            Cotizar viaje
          </Link>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="rounded-md border border-border px-3 py-2.5 text-center text-sm font-medium text-foreground"
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
