"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { WhatsAppIcon } from "@/components/ui/social-icons";
import { whatsappLink } from "@/lib/contact";

const heroVideos = [
  { src: "/videos/laxmar-1.mp4", label: "Unidad Laxmar en ruta" },
  { src: "/videos/laxmar-2.mp4", label: "Unidad Laxmar en viaje" },
];

const CROSSFADE_LEAD_S = 1.5;

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === current) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    });
  }, [current]);

  const handleTimeUpdate = (index: number) => {
    if (index !== current) return;
    const video = videoRefs.current[index];
    if (!video || Number.isNaN(video.duration)) return;
    if (video.currentTime >= video.duration - CROSSFADE_LEAD_S) {
      setCurrent((prev) =>
        prev === index ? (prev + 1) % heroVideos.length : prev,
      );
    }
  };

  return (
    <section
      id="inicio"
      className="relative h-[88vh] min-h-[600px] w-full overflow-hidden"
    >
      {heroVideos.map((video, index) => (
        <video
          key={video.src}
          ref={(el) => {
            videoRefs.current[index] = el;
          }}
          src={video.src}
          poster="/images/laxmar.jpg"
          autoPlay={index === 0}
          muted
          playsInline
          preload="auto"
          aria-label={video.label}
          onTimeUpdate={() => handleTimeUpdate(index)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/75" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl text-white"
        >
          <p className="mb-5 inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur md:text-sm">
            Traslados provinciales y nacionales
          </p>
          <h1 className="text-4xl font-bold leading-[1.05] md:text-6xl lg:text-7xl">
            Seguridad y comodidad a
            <span className="block text-laxmar-green">cualquier punto del país</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
            Flota habilitada de 12 a 45 pasajeros para turismo, empresas y
            eventos. Conductores profesionales, monitoreo satelital y soporte
            24/7 en toda Argentina.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#contacto"
              className="inline-flex h-14 items-center gap-2 rounded-md bg-laxmar-green px-7 text-base font-semibold text-white shadow-lg transition hover:opacity-90 md:text-lg"
            >
              Cotizar viaje
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center gap-2 rounded-md border border-white/35 bg-white/10 px-7 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20 md:text-lg"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
        {heroVideos.map((video, index) => (
          <button
            key={video.src}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`Ver ${video.label}`}
            aria-pressed={current === index}
            className={`h-1.5 rounded-full transition-all ${
              current === index
                ? "w-10 bg-white"
                : "w-5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
