"use client";

import Image from "next/image";
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
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [current, videosEnabled, reduceMotion]);

  const handleTimeUpdate = (index: number) => {
    if (!videosEnabled || reduceMotion || index !== current) return;
    const video = videoRefs.current[index];
    if (!video || Number.isNaN(video.duration) || !video.duration) return;
    if (video.currentTime >= video.duration - CROSSFADE_LEAD_S) {
      setCurrent((prev) =>
        prev === index ? (prev + 1) % heroVideos.length : prev,
      );
    }
  };

  const handleEnded = (index: number) => {
    if (!videosEnabled || reduceMotion || index !== current) return;
    setCurrent((prev) => (prev + 1) % heroVideos.length);
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
            onEnded={() => handleEnded(index)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/80" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 md:px-6">
        <div className="max-w-3xl text-white">
          <Image
            src="/images/logo-laxmar.png"
            alt="Laxmar"
            width={892}
            height={187}
            priority
            className="h-16 w-auto md:h-24 lg:h-28 [filter:drop-shadow(0_0_10px_rgba(46,160,140,0.45))_drop-shadow(0_0_14px_rgba(28,42,74,0.55))_drop-shadow(0_2px_8px_rgba(0,0,0,0.45))]"
          />
          <h1 className="mt-5 text-2xl font-semibold leading-tight text-white/95 md:mt-6 md:text-4xl lg:text-5xl">
            Traslados seguros a cualquier punto del país
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/85 md:text-lg">
            Flota habilitada de hasta 19 personas para turismo, empresas y
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
    </section>
  );
}
