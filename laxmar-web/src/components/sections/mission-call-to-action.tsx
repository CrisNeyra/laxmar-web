import { ArrowRight } from "lucide-react";

export function MissionCallToAction() {
  return (
    <section id="mision" className="w-full py-20 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div
          className="relative overflow-hidden rounded-3xl bg-cover bg-center"
          style={{ backgroundImage: "url('/images/laxmar.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-laxmar-blue/95 via-laxmar-blue/70 to-laxmar-blue/30" />

          <div className="relative z-10 flex min-h-[420px] items-end p-6 md:p-12">
            <article className="max-w-xl rounded-2xl bg-background/95 p-7 shadow-2xl backdrop-blur md:p-9">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-laxmar-green">
                Nuestra misión
              </p>
              <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
                Traslados seguros, cómodos y confiables
              </h2>
              <p className="mt-4 text-muted-foreground">
                Brindamos servicios de transporte con un objetivo claro:
                excelencia en cada viaje de corta, media y larga distancia
                para empresas, turistas y delegaciones.
              </p>
              <a
                href="#contacto"
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-laxmar-green px-5 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Hablemos
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
