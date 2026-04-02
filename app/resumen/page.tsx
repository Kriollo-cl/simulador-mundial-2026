"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { teamFlagCodes } from "@/lib/mundial-data";
import html2canvas from "html2canvas";
import { useRef } from "react";


type EquipoClasificado = {
  equipo: string;
  grupo: string;
  pj: number;
  g: number;
  e: number;
  p: number;
  gf: number;
  gc: number;
  dg: number;
  pts: number;
  posicion: 1 | 2 | 3;
};

type MundialData = {
  clasificados: {
    ganadores: EquipoClasificado[];
    segundos: EquipoClasificado[];
    terceros: EquipoClasificado[];
    mejoresTerceros: EquipoClasificado[];
  };
};

type WinnersMap = Record<string, string>;

function Flag({ team }: { team: string }) {
  const code = teamFlagCodes[team];

  if (!code) {
    return (
      <span className="inline-flex h-5 w-7 items-center justify-center rounded-sm bg-neutral-800 text-[10px] text-neutral-400">
        ?
      </span>
    );
  }

  return (
    <img
      src={`https://flagcdn.com/24x18/${code}.png`}
      alt={`Bandera de ${team}`}
      className="h-[16px] w-[24px] rounded-[2px] object-cover"
    />
  );
}
function ExportFlag({ team }: { team: string }) {
  const code = teamFlagCodes[team];

  if (!code) {
    return (
      <span
        style={{
          display: "inline-flex",
          width: "24px",
          height: "16px",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "3px",
          background: "#262626",
          color: "#a3a3a3",
          fontSize: "10px",
          flexShrink: 0,
        }}
      >
        ?
      </span>
    );
  }

  return (
    <img
      src={`https://flagcdn.com/24x18/${code}.png`}
      alt={`Bandera de ${team}`}
      crossOrigin="anonymous"
      style={{
        width: "24px",
        height: "16px",
        objectFit: "cover",
        borderRadius: "3px",
        flexShrink: 0,
      }}
    />
  );
}

export default function ResumenPage() {
  const [data, setData] = useState<MundialData | null>(null);
  const [winners, setWinners] = useState<WinnersMap>({});

  useEffect(() => {
    const torneo = localStorage.getItem("mundial-2026-data");
    const picks = localStorage.getItem("mundial-2026-winners");

    if (torneo) setData(JSON.parse(torneo));
    if (picks) setWinners(JSON.parse(picks));
  }, []);
  const resumenRef = useRef<HTMLDivElement | null>(null);
  const exportRef = useRef<HTMLDivElement | null>(null);

const descargarImagen = async () => {
  if (!exportRef.current) return;

  try {
    const canvas = await html2canvas(exportRef.current, {
      backgroundColor: "#0a0a0a",
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const link = document.createElement("a");
    link.download = "mi-prediccion-mundial-2026.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch (error) {
    console.error("Error al generar la imagen:", error);
    alert("No se pudo generar la imagen.");
  }
};

  const campeon = winners["M104"] ?? "Por definir";
  const tercerLugar = winners["M103"] ?? "Por definir";
  const finalista1 = winners["M101"] ?? "Por definir";
  const finalista2 = winners["M102"] ?? "Por definir";

  const semifinalistas = useMemo(() => {
    const set = new Set<string>();

    if (winners["M97"]) set.add(winners["M97"]);
    if (winners["M98"]) set.add(winners["M98"]);
    if (winners["M99"]) set.add(winners["M99"]);
    if (winners["M100"]) set.add(winners["M100"]);

    return Array.from(set);
  }, [winners]);

  const ganadoresGrupo = data?.clasificados?.ganadores ?? [];

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.35em] text-amber-300/70">
              Simulador Mundial 2026
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Tu predicción final
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-300">
              Un resumen limpio de tu torneo proyectado, ideal para revisar o compartir.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
  <Link
    href="/fase-final"
    className="rounded-full border border-neutral-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-900"
  >
    Volver a fase final
  </Link>

  <Link
    href="/grupos"
    className="rounded-full border border-neutral-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-900"
  >
    Volver a grupos
  </Link>

  <button
    onClick={descargarImagen}
    className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-[1.02]"
  >
    Descargar imagen
  </button>
</div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[2rem] border border-amber-300/20 bg-gradient-to-br from-neutral-900 to-black p-8 shadow-2xl">
            <p className="mb-2 text-xs uppercase tracking-[0.35em] text-amber-300/60">
              Campeón proyectado
            </p>

            <div className="flex items-center gap-3">
              {campeon !== "Por definir" && <Flag team={campeon} />}
              <h2 className="text-4xl font-extrabold text-amber-200 sm:text-5xl">
                {campeon}
              </h2>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-4">
                <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-neutral-500">
                  Final
                </p>
                <div className="space-y-2">
                  <ResumenTeam team={finalista1} />
                  <ResumenTeam team={finalista2} />
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-4">
                <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-neutral-500">
                  Tercer lugar
                </p>
                <ResumenTeam team={tercerLugar} />
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-neutral-800 bg-neutral-900 p-6 shadow-xl">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neutral-500">
              Semifinalistas
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {semifinalistas.length > 0 ? (
                semifinalistas.map((team) => (
                  <div
                    key={team}
                    className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4"
                  >
                    <ResumenTeam team={team} />
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 text-sm text-neutral-400 sm:col-span-2">
                  Aún no has completado suficiente parte del bracket.
                </div>
              )}
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-[2rem] border border-neutral-800 bg-neutral-900 p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                Ganadores de grupo
              </p>
              <h2 className="mt-1 text-2xl font-bold">Tus líderes de cada grupo</h2>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {ganadoresGrupo.length > 0 ? (
              ganadoresGrupo.map((equipo) => (
                <div
                  key={equipo.grupo}
                  className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4"
                >
                  <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                    {equipo.grupo}
                  </p>

                  <div className="flex items-center gap-2">
                    <Flag team={equipo.equipo} />
                    <p className="font-semibold">{equipo.equipo}</p>
                  </div>

                  <div className="mt-3 text-sm text-neutral-400">
                    {equipo.pts} pts · DG {equipo.dg} · GF {equipo.gf}
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 text-sm text-neutral-400 md:col-span-2 xl:col-span-3">
                Aún no hay grupos completos guardados.
              </div>
            )}
          </div>
        </section>
      </div>
      <div
  style={{
    position: "fixed",
    left: "-99999px",
    top: 0,
    width: "1200px",
    background: "#0a0a0a",
    color: "#ffffff",
    padding: "40px",
    zIndex: -1,
  }}
>
  <div
    ref={exportRef}
    style={{
      width: "100%",
      background: "#0a0a0a",
      color: "#ffffff",
      fontFamily: "Arial, sans-serif",
      padding: "32px",
      border: "1px solid #262626",
      borderRadius: "24px",
      boxSizing: "border-box",
    }}
  >
    <div style={{ marginBottom: "28px" }}>
      <div
        style={{
          fontSize: "12px",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "#d4a017",
          marginBottom: "10px",
        }}
      >
        Simulador Mundial 2026
      </div>

      <h1
        style={{
          fontSize: "48px",
          fontWeight: 800,
          margin: 0,
          marginBottom: "10px",
        }}
      >
        Tu predicción final
      </h1>

      <p
        style={{
          margin: 0,
          color: "#b3b3b3",
          fontSize: "18px",
          lineHeight: 1.5,
        }}
      >
        Resumen de tu torneo proyectado.
      </p>
    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        gap: "24px",
        marginBottom: "24px",
      }}
    >
      <div
        style={{
          border: "1px solid #3a2d00",
          borderRadius: "24px",
          padding: "24px",
          background: "#111111",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#d4a017",
            marginBottom: "10px",
          }}
        >
          Campeón proyectado
        </div>

        <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "42px",
    fontWeight: 800,
    color: "#f5d76e",
    marginBottom: "20px",
  }}
>
  {campeon !== "Por definir" && <ExportFlag team={campeon} />}
  <span>{campeon}</span>
</div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <div
            style={{
              border: "1px solid #262626",
              borderRadius: "18px",
              padding: "16px",
              background: "#0f0f0f",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#888888",
                marginBottom: "10px",
              }}
            >
              Final
            </div>

            <div style={{ display: "grid", gap: "8px" }}>
              <div
  style={{
    border: "1px solid #262626",
    borderRadius: "12px",
    padding: "10px 12px",
    background: "#0a0a0a",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }}
>
  {finalista1 !== "Por definir" && <ExportFlag team={finalista1} />}
  <span>{finalista1}</span>
</div>
              <div
                style={{
                  border: "1px solid #262626",
                  borderRadius: "12px",
                  padding: "10px 12px",
                  background: "#0a0a0a",
                }}
              >
                {finalista2}
              </div>
            </div>
          </div>

          <div
            style={{
              border: "1px solid #262626",
              borderRadius: "18px",
              padding: "16px",
              background: "#0f0f0f",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#888888",
                marginBottom: "10px",
              }}
            >
              Tercer lugar
            </div>

            <div
  style={{
    border: "1px solid #262626",
    borderRadius: "12px",
    padding: "10px 12px",
    background: "#0a0a0a",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }}
>
  {tercerLugar !== "Por definir" && <ExportFlag team={tercerLugar} />}
  <span>{tercerLugar}</span>
</div>
          </div>
        </div>
      </div>

      <div
        style={{
          border: "1px solid #262626",
          borderRadius: "24px",
          padding: "24px",
          background: "#111111",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#888888",
            marginBottom: "14px",
          }}
        >
          Semifinalistas
        </div>

        <div style={{ display: "grid", gap: "10px" }}>
          {semifinalistas.length > 0 ? (
            semifinalistas.map((team) => (
              <div
  key={team}
  style={{
    border: "1px solid #262626",
    borderRadius: "12px",
    padding: "10px 12px",
    background: "#0a0a0a",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }}
>
  <ExportFlag team={team} />
  <span>{team}</span>
</div>
            ))
          ) : (
            <div
              style={{
                border: "1px solid #262626",
                borderRadius: "12px",
                padding: "10px 12px",
                background: "#0a0a0a",
                color: "#9a9a9a",
              }}
            >
              Aún no hay semifinalistas definidos.
            </div>
          )}
        </div>
      </div>
    </div>

    <div
      style={{
        border: "1px solid #262626",
        borderRadius: "24px",
        padding: "24px",
        background: "#111111",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#888888",
          marginBottom: "8px",
        }}
      >
        Ganadores de grupo
      </div>

      <h2
        style={{
          fontSize: "30px",
          fontWeight: 800,
          margin: 0,
          marginBottom: "18px",
        }}
      >
        Tus líderes de cada grupo
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "12px",
        }}
      >
        {ganadoresGrupo.length > 0 ? (
          ganadoresGrupo.map((equipo) => (
            <div
              key={equipo.grupo}
              style={{
                border: "1px solid #262626",
                borderRadius: "16px",
                padding: "14px",
                background: "#0a0a0a",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#888888",
                  marginBottom: "8px",
                }}
              >
                {equipo.grupo}
              </div>

              <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "18px",
    fontWeight: 700,
    marginBottom: "8px",
  }}
>
  <ExportFlag team={equipo.equipo} />
  <span>{equipo.equipo}</span>
</div>

              <div
                style={{
                  fontSize: "14px",
                  color: "#a3a3a3",
                }}
              >
                {equipo.pts} pts · DG {equipo.dg} · GF {equipo.gf}
              </div>
            </div>
          ))
        ) : (
          <div style={{ color: "#9a9a9a" }}>No hay grupos completos aún.</div>
        )}
      </div>
    </div>
  </div>
</div>
    </main>
  );
}

function ResumenTeam({ team }: { team: string }) {
  if (!team || team === "Por definir") {
    return (
      <div className="rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-400">
        Por definir
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2">
      <Flag team={team} />
      <span className="text-sm font-semibold">{team}</span>
    </div>
  );
}