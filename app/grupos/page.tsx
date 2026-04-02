"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { grupos, teamFlagCodes } from "@/lib/mundial-data";
import {
  calcularTabla,
  sacarClasificados,
  type ResultadosTotales,
} from "@/lib/mundial-utils";
function Flag({ team }: { team: string }) {
  const code = teamFlagCodes[team];

  if (!code) {
    return (
      <span className="inline-flex h-4 w-6 items-center justify-center rounded-sm bg-neutral-800 text-[10px] text-neutral-400">
        ?
      </span>
    );
  }

  return (
    <img
      src={`https://flagcdn.com/24x18/${code}.png`}
      alt={`Bandera de ${team}`}
      className="h-[14px] w-[20px] rounded-[2px] object-cover"
    />
  );
}

export default function GruposPage() {
const [resultadosTotales, setResultadosTotales] = useState<ResultadosTotales>({});
const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
  const guardado = localStorage.getItem("mundial-2026-grupos");
  if (guardado) {
    setResultadosTotales(JSON.parse(guardado));
  }
  setIsLoaded(true);
}, []);

  useEffect(() => {
  if (!isLoaded) return;

  localStorage.setItem(
    "mundial-2026-grupos",
    JSON.stringify(resultadosTotales)
  );
}, [resultadosTotales, isLoaded]);
  const actualizarResultado = (
    grupoNombre: string,
    index: number,
    lado: "local" | "visitante",
    valor: string
  ) => {
    if (valor !== "" && Number(valor) < 0) return;

    setResultadosTotales((prev) => ({
      ...prev,
      [grupoNombre]: {
        ...prev[grupoNombre],
        [index]: {
          local: prev[grupoNombre]?.[index]?.local ?? "",
          visitante: prev[grupoNombre]?.[index]?.visitante ?? "",
          [lado]: valor,
        },
      },
    }));
  };

  const tablasPorGrupo = useMemo(() => {
    const tablas: Record<string, ReturnType<typeof calcularTabla>> = {};

    grupos.forEach((grupo) => {
      tablas[grupo.nombre] = calcularTabla(
        grupo.partidos,
        resultadosTotales[grupo.nombre] ?? {}
      );
    });


    return tablas;
  }, [resultadosTotales]);
const totalPartidos = grupos.reduce((acc, grupo) => acc + grupo.partidos.length, 0);

const partidosCompletados = grupos.reduce((acc, grupo) => {
  const resultadosGrupo = resultadosTotales[grupo.nombre] ?? {};

  const completos = grupo.partidos.filter((_, index) => {
    const resultado = resultadosGrupo[index];
    return (
      resultado &&
      resultado.local !== "" &&
      resultado.visitante !== ""
    );
  }).length;

  return acc + completos;
}, 0);

const faltanPartidos = totalPartidos - partidosCompletados;
const gruposCompletos = faltanPartidos === 0;
  const guardarDatosTorneo = () => {
  const clasificados = sacarClasificados(tablasPorGrupo);

  localStorage.setItem(
    "mundial-2026-data",
    JSON.stringify({
      resultadosTotales,
      tablasPorGrupo,
      clasificados,
    })
  );

  localStorage.removeItem("mundial-2026-winners");
};
const reiniciarSimulador = () => {
  const confirmado = window.confirm(
    "¿Seguro que quieres reiniciar toda la simulación? Se borrarán los resultados de grupos y la fase final."
  );

  if (!confirmado) return;

  localStorage.removeItem("mundial-2026-grupos");
  localStorage.removeItem("mundial-2026-data");
  localStorage.removeItem("mundial-2026-winners");
  setResultadosTotales({});
};

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-amber-300/70">
            Simulador Mundial 2026
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Fase de grupos
          </h1>
          <p className="mt-3 max-w-2xl text-neutral-300">
            Completa los resultados de cada grupo y deja que la tabla se actualice
            automáticamente.
          </p>
        </div>
<div className="mb-6 rounded-2xl border border-neutral-800 bg-neutral-900 px-5 py-4">
  {gruposCompletos ? (
    <p className="text-sm text-emerald-300">
      Ya completaste todos los partidos de la fase de grupos. Puedes pasar a la fase final.
    </p>
  ) : (
    <p className="text-sm text-neutral-300">
      Llevas <span className="font-semibold text-white">{partidosCompletados}</span> de{" "}
      <span className="font-semibold text-white">{totalPartidos}</span> partidos completados.
      Aún faltan <span className="font-semibold text-amber-300">{faltanPartidos}</span>.
    </p>
  )}
</div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {grupos.map((grupo) => {
            const tabla = tablasPorGrupo[grupo.nombre] ?? [];

            return (
              <section
                key={grupo.nombre}
                className="rounded-[1.75rem] border border-neutral-800 bg-neutral-900 p-5 shadow-lg"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{grupo.nombre}</h2>
                  <span className="rounded-full border border-neutral-700 px-3 py-1 text-xs uppercase tracking-[0.18em] text-neutral-400">
                    4 equipos
                  </span>
                </div>
<div className="mb-3 flex flex-wrap gap-3 text-[11px] text-neutral-400">
  <div className="flex items-center gap-2">
    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
    <span>1° clasifica directo</span>
  </div>
  <div className="flex items-center gap-2">
    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
    <span>2° clasifica directo</span>
  </div>
  <div className="flex items-center gap-2">
    <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
    <span>3° compite entre mejores terceros</span>
  </div>
</div>
                {/* TABLA ARRIBA */}
                <div className="mb-5 overflow-hidden rounded-2xl border border-neutral-800">
                  <div className="grid grid-cols-[1.9fr_repeat(8,0.55fr)] bg-neutral-950 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    <span>Equipo</span>
                    <span className="text-center">PJ</span>
                    <span className="text-center">G</span>
                    <span className="text-center">E</span>
                    <span className="text-center">P</span>
                    <span className="text-center">GF</span>
                    <span className="text-center">GC</span>
                    <span className="text-center">DG</span>
                    <span className="text-center">PTS</span>
                  </div>

                  {tabla.map((fila, index) => (
  <div
    key={fila.equipo}
    className={`grid grid-cols-[1.9fr_repeat(8,0.55fr)] px-3 py-2 text-sm border-t border-neutral-800 ${
      index === 0
        ? "bg-emerald-500/14"
        : index === 1
        ? "bg-emerald-500/7"
        : index === 2
        ? "bg-amber-400/8"
        : "bg-neutral-900"
    }`}
  >
                      <div className="flex items-center gap-2 overflow-hidden">
  <span
    className={`h-2.5 w-2.5 rounded-full shrink-0 ${
      index === 0
        ? "bg-emerald-400"
        : index === 1
        ? "bg-emerald-300"
        : index === 2
        ? "bg-amber-300"
        : "bg-neutral-600"
    }`}
  />
  <Flag team={fila.equipo} />
  <span className="truncate font-medium">{fila.equipo}</span>
</div>
                      <span className="text-center">{fila.pj}</span>
                      <span className="text-center">{fila.g}</span>
                      <span className="text-center">{fila.e}</span>
                      <span className="text-center">{fila.p}</span>
                      <span className="text-center">{fila.gf}</span>
                      <span className="text-center">{fila.gc}</span>
                      <span className="text-center">{fila.dg}</span>
                      <span className="text-center font-semibold text-white">
                        {fila.pts}
                      </span>
                    </div>
                  ))}
                </div>

                {/* PARTIDOS ABAJO */}
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-neutral-500">
                    Partidos del grupo
                  </p>

                  <div className="space-y-3">
                    {grupo.partidos.map(([local, visitante], index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-neutral-800 bg-neutral-950 p-3"
                      >
                        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                          <div className="flex items-center gap-2 overflow-hidden">
                            <Flag team={local} />
                            <span className="truncate text-sm font-medium text-neutral-200">
                              {local}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min="0"
                              value={
                                resultadosTotales[grupo.nombre]?.[index]?.local ?? ""
                              }
                              onChange={(e) =>
                                actualizarResultado(
                                  grupo.nombre,
                                  index,
                                  "local",
                                  e.target.value
                                )
                              }
                              className="w-12 rounded-xl border border-neutral-700 bg-neutral-900 px-2 py-2 text-center text-white outline-none"
                            />

                            <span className="text-neutral-500">-</span>

                            <input
                              type="number"
                              min="0"
                              value={
                                resultadosTotales[grupo.nombre]?.[index]
                                  ?.visitante ?? ""
                              }
                              onChange={(e) =>
                                actualizarResultado(
                                  grupo.nombre,
                                  index,
                                  "visitante",
                                  e.target.value
                                )
                              }
                              className="w-12 rounded-xl border border-neutral-700 bg-neutral-900 px-2 py-2 text-center text-white outline-none"
                            />
                          </div>

                          <div className="flex items-center justify-end gap-2 overflow-hidden">
                            <span className="truncate text-right text-sm font-medium text-neutral-200">
                              {visitante}
                            </span>
                            <Flag team={visitante} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center">
  <Link
    href="/fase-final"
    onClick={guardarDatosTorneo}
    className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:scale-[1.02]"
  >
    {gruposCompletos ? "Ir a fase final" : "Ir a fase final igualmente"}
  </Link>

  <button
    onClick={reiniciarSimulador}
    className="mt-4 rounded-full border border-neutral-700 px-5 py-2 text-xs font-medium text-neutral-300 transition hover:bg-neutral-900"
  >
    Reiniciar simulación
  </button>
</div>
      </div>
    </main>
  );
}