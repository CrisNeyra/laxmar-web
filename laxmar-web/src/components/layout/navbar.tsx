"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#inicio", label: "Inicio" },
  { href: "#destinos", label: "Destinos" },
  { href: "#flota", label: "Flota" },
  { href: "#proceso", label: "Cómo trabajamos" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-all",
        scrolled
          ? "border-border bg-background/95 backdrop-blur"
          : "border-transparent bg-background/70 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-24 w-full max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="#inicio" className="flex items-center" aria-label="Laxmar - Inicio">
          <Image
            src="/images/logo-laxmar.jpg"
            alt="Laxmar"
            width={1024}
            height={473}
            priority
            className="h-14 w-auto md:h-20"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border transition-all md:hidden",
          open ? "max-h-80" : "max-h-0 border-transparent",
        )}
      >
        <nav className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-3">
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
        </nav>
      </div>
    </header>
  );
}
