"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { WhatsAppIcon } from "@/components/ui/social-icons";
import { whatsappLink } from "@/lib/contact";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const heroVideos = [
  { src: "/videos/laxmar-1.mp4", label: "Unidad Laxmar en ruta" },
  { src: "/videos/laxmar-2.mp4", label: "Unidad Laxmar en viaje" },
];

const CROSSFADE_LEAD_S = 1.5;

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [videosEnabled, setVideosEnabled] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const enableVideos = () => setVideosEnabled(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();

        const ric = window.requestIdleCallback;
        if (typeof ric === "function") {
          idleId = ric(enableVideos, { timeout: 1800 });
        } else {
          timeoutId = setTimeout(enableVideos, 600);
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!videosEnabled || reduceMotion) return;

    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === current) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [current, videosEnabled, reduceMotion]);

  const handleTimeUpdate = (index: number) => {
    if (!videosEnabled || reduceMotion || index !== current) return;
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
      ref={sectionRef}
      id="inicio"
      className="relative h-[88vh] min-h-[600px] w-full overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/flota-laxmar.jpg')" }}
        aria-hidden="true"
      />

      {videosEnabled &&
        !reduceMotion &&
        heroVideos.map((video, index) => (
          <video
            key={video.src}
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            src={video.src}
            poster="/images/flota-laxmar.jpg"
            muted
            playsInline
            preload={index === current ? "metadata" : "none"}
            aria-label={video.label}
            onTimeUpdate={() => handleTimeUpdate(index)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/80" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 md:px-6">
        <div className="max-w-3xl text-white">
          <p className="text-5xl font-black tracking-tight text-white md:text-7xl lg:text-8xl">
            LAX<span className="text-laxmar-green">MAR</span>
          </p>
          <h1 className="mt-4 text-2xl font-semibold leading-tight text-white/95 md:mt-5 md:text-4xl lg:text-5xl">
            Traslados seguros a cualquier punto del país
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/85 md:text-lg">
            Flota habilitada de 12 a 45 pasajeros para turismo, empresas y
            eventos. Respondemos rápido por WhatsApp.
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
        </div>
      </div>

      {videosEnabled && !reduceMotion && (
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
      )}
    </section>
  );
}
