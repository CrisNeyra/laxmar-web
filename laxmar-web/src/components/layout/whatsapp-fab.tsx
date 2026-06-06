"use client";

import { motion } from "framer-motion";

import { WhatsAppIcon } from "@/components/ui/social-icons";
import { CONTACT, whatsappLink } from "@/lib/contact";

export function WhatsAppFab() {
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Escribinos por WhatsApp al ${CONTACT.phoneLabel}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.45, ease: "easeOut" }}
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3"
    >
      <span className="pointer-events-none hidden rounded-full bg-foreground/90 px-4 py-2 text-sm font-medium text-background opacity-0 shadow-lg backdrop-blur transition-opacity duration-200 group-hover:opacity-100 md:block">
        Escribinos
      </span>

      <span className="relative flex h-14 w-14 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl ring-2 ring-white/60 transition-transform duration-200 group-hover:scale-110">
          <WhatsAppIcon className="h-8 w-8" />
        </span>
      </span>
    </motion.a>
  );
}
