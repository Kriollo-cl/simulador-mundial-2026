import Link from "next/link";
import { Analytics } from "@vercel/analytics/next"

const pasos = [
  {
    titulo: "Completa la fase de grupos",
    descripcion:
      "Ingresa tus resultados partido a partido y deja que la tabla se actualice automáticamente.",
  },
  {
    titulo: "Descubre los clasificados",
    descripcion:
      "El simulador define los cruces de la fase final según tu predicción del torneo.",
  },
  {
    titulo: "Elige a tu campeón",
    descripcion:
      "Avanza ronda a ronda hasta la final y crea tu propio Mundial 2026.",
  },
];

const funciones = [
  "Fase de grupos interactiva",
  "Tablas automáticas",
  "Clasificación a fase final",
  "Bracket eliminatorio completo",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="border-b border-neutral-900">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-amber-300/80">
              Simulador Mundial 2026
            </p>

            <h1 className="max-w-3xl text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              Simula tu propio Mundial 2026
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg">
              Predice resultados desde la fase de grupos hasta la final, arma el
              cuadro completo del torneo y descubre quién sería tu campeón del
              mundo.
            </p>

            <div className="mt-8">
  <Link
    href="/grupos"
    className="inline-flex min-w-[260px] items-center justify-center rounded-full bg-white px-10 py-4 text-sm font-semibold text-black transition hover:scale-[1.02]"
  >
    Comenzar predicción
  </Link>
</div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-[2rem] bg-amber-300/5 blur-3xl" />

            <div className="relative rounded-[2rem] border border-neutral-800 bg-neutral-900/80 p-5 shadow-2xl">
              <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[1.5rem] border border-neutral-800 bg-neutral-950 p-4">
                  <p className="mb-3 text-xs uppercase tracking-[0.25em] text-neutral-500">
                    Vista previa · Grupos
                  </p>

                  <div className="space-y-3">
                    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-3">
                      <div className="mb-2 flex items-center justify-between text-sm font-semibold">
                        <span>Grupo A</span>
                        <span className="text-neutral-500">Tabla</span>
                      </div>

                      <div className="space-y-2 text-sm text-neutral-300">
                        <div className="flex items-center justify-between rounded-lg bg-neutral-950 px-3 py-2">
                          <span>México</span>
                          <span>2 - 1</span>
                          <span>Japón</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-neutral-950 px-3 py-2">
                          <span>Senegal</span>
                          <span>1 - 1</span>
                          <span>Polonia</span>
                        </div>
                        <div className="rounded-lg bg-neutral-950 p-3 text-xs text-neutral-400">
                          1. México · 3 pts
                          <br />
                          2. Senegal · 1 pt
                          <br />
                          3. Polonia · 1 pt
                          <br />
                          4. Japón · 0 pts
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-neutral-800 bg-neutral-950 p-4">
                  <p className="mb-3 text-xs uppercase tracking-[0.25em] text-neutral-500">
                    Vista previa · Bracket
                  </p>

                  <div className="space-y-3">
                    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-3">
                      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-neutral-500">
                        Octavos
                      </p>
                      <div className="space-y-2">
                        <div className="rounded-lg bg-neutral-950 px-3 py-2 text-sm">
                          México vs Portugal
                        </div>
                        <div className="rounded-lg bg-neutral-950 px-3 py-2 text-sm">
                          Argentina vs Croacia
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-amber-300/20 bg-neutral-900 p-3">
                      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-amber-300/70">
                        Campeón proyectado
                      </p>
                      <div className="rounded-lg bg-neutral-950 px-3 py-3 text-lg font-bold text-amber-200">
                        Argentina
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-900">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neutral-500">
              Cómo funciona
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Crea tu predicción en tres pasos
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {pasos.map((paso, index) => (
              <div
                key={paso.titulo}
                className="rounded-[1.75rem] border border-neutral-800 bg-neutral-900 p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-amber-300/30 bg-neutral-950 text-sm font-bold text-amber-200">
                  0{index + 1}
                </div>

                <h3 className="text-xl font-bold">{paso.titulo}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-300">
                  {paso.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-900">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neutral-500">
              Qué incluye
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Una base completa para simular todo el torneo
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-300 sm:text-base">
              El objetivo de esta primera versión es que puedas recorrer todo el
              Mundial 2026 de forma simple, visual y rápida, desde la primera
              fecha hasta la final.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {funciones.map((item) => (
              <div
                key={item}
                className="rounded-[1.5rem] border border-neutral-800 bg-neutral-900 p-5"
              >
                <div className="mb-3 h-2 w-12 rounded-full bg-amber-300/70" />
                <p className="text-base font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neutral-500">
            Empieza ahora
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            Arma tu Mundial y elige a tu campeón
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-300 sm:text-base">
            Ya tienes la base lista para predecir grupos, clasificados y toda la
            fase final en un solo recorrido.
          </p>

          <div className="mt-8">
            <Link
              href="/grupos"
              className="inline-block rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:scale-[1.02]"
            >
              Empezar simulación
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}