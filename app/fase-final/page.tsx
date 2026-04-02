"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { matches, type MatchId } from "@/lib/fase-final-data";
import { teamFlagCodes } from "@/lib/mundial-data";
import {
  crearMapaClasificados,
  obtenerGruposMejoresTerceros,
  resolverCrucesMejoresTerceros,
} from "@/lib/mundial-utils";

type MundialData = {
  clasificados: any;
};

type WinnersMap = Partial<Record<MatchId, string>>;

const leftRound32: MatchId[] = [
  "M74",
  "M77",
  "M73",
  "M75",
  "M83",
  "M84",
  "M81",
  "M82",
];

const leftRound16: MatchId[] = ["M89", "M90", "M93", "M94"];
const leftQuarters: MatchId[] = ["M97", "M98"];
const leftSemi: MatchId[] = ["M101"];

const rightRound32: MatchId[] = [
  "M76",
  "M78",
  "M79",
  "M80",
  "M86",
  "M88",
  "M85",
  "M87",
];

const rightRound16: MatchId[] = ["M91", "M92", "M95", "M96"];
const rightQuarters: MatchId[] = ["M99", "M100"];
const rightSemi: MatchId[] = ["M102"];

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

export default function FaseFinalPage() {
  const [data, setData] = useState<MundialData | null>(null);
const [winners, setWinners] = useState<WinnersMap>({});
const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
  const guardado = localStorage.getItem("mundial-2026-data");
  if (guardado) {
    setData(JSON.parse(guardado));
  }

  const winnersGuardados = localStorage.getItem("mundial-2026-winners");
  if (winnersGuardados) {
    setWinners(JSON.parse(winnersGuardados));
  }

  setIsLoaded(true);
}, []);

  useEffect(() => {
  if (!isLoaded) return;
  localStorage.setItem("mundial-2026-winners", JSON.stringify(winners));
}, [winners, isLoaded]);

  const reiniciarFaseFinal = () => {
    const confirmado = window.confirm(
      "¿Seguro que quieres reiniciar la fase final? Se borrarán todos los ganadores que elegiste en el bracket."
    );

    if (!confirmado) return;

    localStorage.removeItem("mundial-2026-winners");
    setWinners({});
  };

  const mapaClasificados = useMemo(() => {
    if (!data) return {};
    return crearMapaClasificados(data.clasificados);
  }, [data]);

  const gruposTerceros = useMemo(() => {
    if (!data) return [];
    return obtenerGruposMejoresTerceros(data.clasificados);
  }, [data]);

  const slotsTerceros = useMemo(() => {
    if (!data) return null;
    return resolverCrucesMejoresTerceros(data.clasificados);
  }, [data]);

  const tercerosPorPartido: Record<string, string | undefined> = slotsTerceros
    ? {
        M74: slotsTerceros["1E"],
        M77: slotsTerceros["1I"],
        M79: slotsTerceros["1A"],
        M80: slotsTerceros["1L"],
        M81: slotsTerceros["1D"],
        M82: slotsTerceros["1G"],
        M85: slotsTerceros["1B"],
        M87: slotsTerceros["1K"],
      }
    : {};

  const resolverSlot = (slot: string): string => {
    if (slot.startsWith("W")) {
      const matchId = `M${slot.slice(1)}` as MatchId;
      return winners[matchId] ?? "Por definir";
    }

    if (slot.startsWith("L")) {
      const matchId = `M${slot.slice(1)}` as MatchId;
      const ganador = winners[matchId];

      if (!ganador) return "Por definir";

      const match = matches.find((m) => m.id === matchId);
      if (!match) return "Por definir";

      const slotA = match.teamA;
      const slotB = tercerosPorPartido[match.id] ?? match.teamB;

      const nombreA = resolverSlot(slotA);
      const nombreB = resolverSlot(slotB);

      if (ganador === nombreA) return nombreB;
      if (ganador === nombreB) return nombreA;

      return "Por definir";
    }

    if (mapaClasificados[slot]) return mapaClasificados[slot];

    return "Por definir";
  };

  const obtenerEquiposPartido = (matchId: MatchId) => {
    const match = matches.find((m) => m.id === matchId);

    if (!match) {
      return {
        slotA: "",
        slotB: "",
        nombreA: "Por definir",
        nombreB: "Por definir",
      };
    }

    const slotA = match.teamA;
    const slotB = tercerosPorPartido[match.id] ?? match.teamB;

    return {
      slotA,
      slotB,
      nombreA: resolverSlot(slotA),
      nombreB: resolverSlot(slotB),
    };
  };

  const elegirGanador = (matchId: MatchId, equipo: string) => {
    if (equipo === "Por definir") return;

    setWinners((prev) => {
      const updated = { ...prev, [matchId]: equipo };

      const orden: MatchId[] = [
        "M73",
        "M74",
        "M75",
        "M76",
        "M77",
        "M78",
        "M79",
        "M80",
        "M81",
        "M82",
        "M83",
        "M84",
        "M85",
        "M86",
        "M87",
        "M88",
        "M89",
        "M90",
        "M91",
        "M92",
        "M93",
        "M94",
        "M95",
        "M96",
        "M97",
        "M98",
        "M99",
        "M100",
        "M101",
        "M102",
        "M103",
        "M104",
      ];

      const dependencias: Partial<Record<MatchId, MatchId[]>> = {
        M89: ["M74", "M77"],
        M90: ["M73", "M75"],
        M91: ["M76", "M78"],
        M92: ["M79", "M80"],
        M93: ["M83", "M84"],
        M94: ["M81", "M82"],
        M95: ["M86", "M88"],
        M96: ["M85", "M87"],
        M97: ["M89", "M90"],
        M98: ["M93", "M94"],
        M99: ["M91", "M92"],
        M100: ["M95", "M96"],
        M101: ["M97", "M98"],
        M102: ["M99", "M100"],
        M103: ["M101", "M102"],
        M104: ["M101", "M102"],
      };

      const limpiarDependientes = (changedMatch: MatchId) => {
        orden.forEach((id) => {
          const deps = dependencias[id];
          if (deps?.includes(changedMatch)) {
            delete updated[id];
            limpiarDependientes(id);
          }
        });
      };

      limpiarDependientes(matchId);

      return updated;
    });
  };

  const campeon = winners["M104"];
  const finalistaA = resolverSlot("W101");
  const finalistaB = resolverSlot("W102");

  return (
    <main className="min-h-screen overflow-x-auto bg-neutral-950 px-6 py-8 text-white">
      <div className="mx-auto flex max-w-[2500px] flex-col items-center">
        <div className="mb-5 w-full">
          <p className="mb-2 text-xs uppercase tracking-[0.35em] text-amber-300/70">
            Simulador Mundial 2026
          </p>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                Fase final
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-300">
                Elige los ganadores de cada cruce y completa tu bracket hasta
                definir al campeón del Mundial 2026.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
  <Link
    href="/grupos"
    className="rounded-full border border-neutral-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-900"
  >
    Volver a grupos
  </Link>

  <Link
    href="/resumen"
    className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-[1.02]"
  >
    Ver resumen
  </Link>

  <button
    onClick={reiniciarFaseFinal}
    className="rounded-full border border-neutral-700 px-5 py-2.5 text-sm font-semibold text-neutral-300 transition hover:bg-neutral-900"
  >
    Reiniciar fase final
  </button>
</div>
          </div>
        </div>

        {!data ? (
          <div className="w-full rounded-3xl border border-neutral-800 bg-neutral-900 p-6">
            <p className="text-neutral-300">
              No hay datos del torneo guardados todavía.
            </p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto pb-8">
            <div className="mx-auto min-w-[1750px] max-w-[1850px]">
              <div className="mb-6 grid grid-cols-[1.08fr_0.95fr_0.82fr_0.68fr_0.95fr_0.68fr_0.82fr_0.95fr_1.08fr] gap-4">
                <RoundLabel text="Round of 32" />
                <RoundLabel text="Round of 16" />
                <RoundLabel text="Quarter-finals" />
                <RoundLabel text="Semi-finals" />
                <RoundLabel text="Final & campeón" center />
                <RoundLabel text="Semi-finals" />
                <RoundLabel text="Quarter-finals" />
                <RoundLabel text="Round of 16" />
                <RoundLabel text="Round of 32" />
              </div>

              <div className="grid grid-cols-[1.08fr_0.95fr_0.82fr_0.68fr_0.95fr_0.68fr_0.82fr_0.95fr_1.08fr] gap-4">
                <BracketColumn
                  matches={leftRound32}
                  getMatch={obtenerEquiposPartido}
                  winners={winners}
                  onPick={elegirGanador}
                  level="r32"
                />

                <BracketColumn
                  matches={leftRound16}
                  getMatch={obtenerEquiposPartido}
                  winners={winners}
                  onPick={elegirGanador}
                  level="r16"
                />

                <BracketColumn
                  matches={leftQuarters}
                  getMatch={obtenerEquiposPartido}
                  winners={winners}
                  onPick={elegirGanador}
                  level="qf"
                />

                <BracketColumn
                  matches={leftSemi}
                  getMatch={obtenerEquiposPartido}
                  winners={winners}
                  onPick={elegirGanador}
                  level="sf"
                />

                <div className="flex flex-col items-center justify-center gap-4 pt-2">
                  <div className="w-full max-w-[220px] rounded-[1.4rem] border border-amber-300/25 bg-gradient-to-br from-neutral-900 to-black p-4 text-center shadow-2xl">
                    <p className="mb-2 text-[11px] uppercase tracking-[0.25em] text-amber-300/60">
                      Final
                    </p>

                    <div className="space-y-2">
                      <MatchTeamButton
                        slotLabel="W101"
                        teamName={finalistaA}
                        selected={winners["M104"] === finalistaA}
                        onClick={() =>
                          elegirGanador("M104", finalistaA)
                        }
                      />

                      <MatchTeamButton
                        slotLabel="W102"
                        teamName={finalistaB}
                        selected={winners["M104"] === finalistaB}
                        onClick={() =>
                          elegirGanador("M104", finalistaB)
                        }
                      />
                    </div>
                  </div>

                  <div className="w-full max-w-[220px] rounded-[1.4rem] border border-amber-300/25 bg-gradient-to-b from-neutral-900 to-neutral-950 p-4 text-center shadow-2xl">
                    <p className="mb-2 text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                      Campeón proyectado
                    </p>

                    <div className="flex items-center justify-center gap-2">
                      {campeon && campeon !== "Por definir" && <Flag team={campeon} />}
                      <h2 className="text-3xl font-extrabold tracking-tight text-amber-200">
                        {campeon ?? "Por definir"}
                      </h2>
                    </div>
                  </div>

                  <div className="w-full max-w-[220px] rounded-[1.25rem] border border-neutral-800 bg-neutral-900 p-3 text-center shadow-xl">
                    <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                      Third-place match
                    </p>

                    <div className="space-y-2">
                      <MatchTeamButton
                        slotLabel="L101"
                        teamName={resolverSlot("L101")}
                        selected={winners["M103"] === resolverSlot("L101")}
                        onClick={() =>
                          elegirGanador("M103", resolverSlot("L101"))
                        }
                      />

                      <MatchTeamButton
                        slotLabel="L102"
                        teamName={resolverSlot("L102")}
                        selected={winners["M103"] === resolverSlot("L102")}
                        onClick={() =>
                          elegirGanador("M103", resolverSlot("L102"))
                        }
                      />
                    </div>
                  </div>
                </div>

                <BracketColumn
                  matches={rightSemi}
                  getMatch={obtenerEquiposPartido}
                  winners={winners}
                  onPick={elegirGanador}
                  level="sf"
                />

                <BracketColumn
                  matches={rightQuarters}
                  getMatch={obtenerEquiposPartido}
                  winners={winners}
                  onPick={elegirGanador}
                  level="qf"
                />

                <BracketColumn
                  matches={rightRound16}
                  getMatch={obtenerEquiposPartido}
                  winners={winners}
                  onPick={elegirGanador}
                  level="r16"
                />

                <BracketColumn
                  matches={rightRound32}
                  getMatch={obtenerEquiposPartido}
                  winners={winners}
                  onPick={elegirGanador}
                  level="r32"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function RoundLabel({
  text,
  center = false,
}: {
  text: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-400">
        {text}
      </h2>
    </div>
  );
}

function BracketColumn({
  matches,
  getMatch,
  winners,
  onPick,
  level,
}: {
  matches: MatchId[];
  getMatch: (matchId: MatchId) => {
    slotA: string;
    slotB: string;
    nombreA: string;
    nombreB: string;
  };
  winners: WinnersMap;
  onPick: (matchId: MatchId, team: string) => void;
  level: "r32" | "r16" | "qf" | "sf";
}) {
  const columnHeight = 1120;
  const cardHeight = 114;

  const topForIndex = (index: number) => {
    if (level === "r32") return index * 128;
    if (level === "r16") return 64 + index * 256;
    if (level === "qf") return 192 + index * 512;
    return 448;
  };

  return (
    <div className="relative flex flex-col">
      <div className="relative" style={{ height: `${columnHeight}px` }}>
        {matches.map((matchId, index) => {
          const { slotA, slotB, nombreA, nombreB } = getMatch(matchId);
          const ganador = winners[matchId];

          return (
            <section
              key={matchId}
              className={`absolute left-0 right-0 rounded-xl p-2 shadow-lg transition ${
  winners[matchId]
    ? "border border-amber-300/25 bg-neutral-900"
    : "border border-neutral-800 bg-neutral-900"
}`}
              style={{
                top: `${topForIndex(index)}px`,
                height: `${cardHeight}px`,
              }}
            >
              <div className="space-y-1">
                <MatchTeamButton
                  slotLabel={slotA}
                  teamName={nombreA}
                  selected={ganador === nombreA}
                  onClick={() => onPick(matchId, nombreA)}
                />

                <MatchTeamButton
                  slotLabel={slotB}
                  teamName={nombreB}
                  selected={ganador === nombreB}
                  onClick={() => onPick(matchId, nombreB)}
                />
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function MatchTeamButton({
  slotLabel,
  teamName,
  selected,
  onClick,
}: {
  slotLabel: string;
  teamName: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-lg border px-2 py-1.5 text-left transition ${
       selected
  ? "border-amber-300 bg-amber-200 text-black shadow-lg ring-1 ring-amber-300/70"
          : "border-neutral-800 bg-neutral-950 text-white hover:border-neutral-600 hover:bg-neutral-900"
      }`}
    >
      <p
        className={`mb-0.5 text-[8px] uppercase tracking-[0.1em] ${
          selected ? "text-black/60" : "text-neutral-500"
        }`}
      >
        {slotLabel}
      </p>

      <div className="flex items-center gap-2 overflow-hidden">
        {teamName !== "Por definir" && <Flag team={teamName} />}
        <p className="truncate text-[13px] font-semibold leading-none">
          {teamName}
        </p>
      </div>
    </button>
  );
}