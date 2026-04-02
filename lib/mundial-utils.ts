import { getAnnexCSlots } from "./annex-c-map";
import type { Partido } from "./mundial-data";

export type TablaEquipo = {
  equipo: string;
  pj: number;
  g: number;
  e: number;
  p: number;
  gf: number;
  gc: number;
  dg: number;
  pts: number;
};

export type ResultadoGrupo = Record<number, { local: string; visitante: string }>;
export type ResultadosTotales = Record<string, ResultadoGrupo>;

export function crearTablaInicial(partidos: Partido[]): TablaEquipo[] {
  const equipos = Array.from(new Set(partidos.flatMap((p) => p)));

  return equipos.map((equipo) => ({
    equipo,
    pj: 0,
    g: 0,
    e: 0,
    p: 0,
    gf: 0,
    gc: 0,
    dg: 0,
    pts: 0,
  }));
}

export function calcularTabla(
  partidos: Partido[],
  resultados: ResultadoGrupo
): TablaEquipo[] {
  const tabla = crearTablaInicial(partidos);
  const mapa = new Map<string, TablaEquipo>();

  tabla.forEach((fila) => mapa.set(fila.equipo, { ...fila }));

  partidos.forEach(([local, visitante], index) => {
    const resultado = resultados[index];
    if (!resultado) return;
    if (resultado.local === "" || resultado.visitante === "") return;

    const golesLocal = Number(resultado.local);
    const golesVisitante = Number(resultado.visitante);

    if (Number.isNaN(golesLocal) || Number.isNaN(golesVisitante)) return;

    const eqLocal = mapa.get(local);
    const eqVisitante = mapa.get(visitante);

    if (!eqLocal || !eqVisitante) return;

    eqLocal.pj += 1;
    eqVisitante.pj += 1;

    eqLocal.gf += golesLocal;
    eqLocal.gc += golesVisitante;
    eqVisitante.gf += golesVisitante;
    eqVisitante.gc += golesLocal;

    if (golesLocal > golesVisitante) {
      eqLocal.g += 1;
      eqLocal.pts += 3;
      eqVisitante.p += 1;
    } else if (golesLocal < golesVisitante) {
      eqVisitante.g += 1;
      eqVisitante.pts += 3;
      eqLocal.p += 1;
    } else {
      eqLocal.e += 1;
      eqVisitante.e += 1;
      eqLocal.pts += 1;
      eqVisitante.pts += 1;
    }
  });

  const tablaFinal = Array.from(mapa.values()).map((fila) => ({
    ...fila,
    dg: fila.gf - fila.gc,
  }));

  tablaFinal.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.dg !== a.dg) return b.dg - a.dg;
    if (b.gf !== a.gf) return b.gf - a.gf;
    return a.equipo.localeCompare(b.equipo);
  });

  return tablaFinal;
}

export type EquipoClasificado = TablaEquipo & {
  grupo: string;
  posicion: 1 | 2 | 3;
};

export function sacarClasificados(
  tablasPorGrupo: Record<string, TablaEquipo[]>
) {
  const ganadores: EquipoClasificado[] = [];
  const segundos: EquipoClasificado[] = [];
  const terceros: EquipoClasificado[] = [];

  Object.entries(tablasPorGrupo).forEach(([grupo, tabla]) => {
    if (tabla[0]) ganadores.push({ ...tabla[0], grupo, posicion: 1 });
    if (tabla[1]) segundos.push({ ...tabla[1], grupo, posicion: 2 });
    if (tabla[2]) terceros.push({ ...tabla[2], grupo, posicion: 3 });
  });

  terceros.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.dg !== a.dg) return b.dg - a.dg;
    if (b.gf !== a.gf) return b.gf - a.gf;
    return a.equipo.localeCompare(b.equipo);
  });

  const mejoresTerceros = terceros.slice(0, 8);

  return {
    ganadores,
    segundos,
    terceros,
    mejoresTerceros,
  };
}

export function crearMapaClasificados(
  clasificados: ReturnType<typeof sacarClasificados>
) {
  const mapa: Record<string, string> = {};

  clasificados.ganadores.forEach((equipo) => {
    const letra = equipo.grupo.replace("Grupo ", "");
    mapa[`1${letra}`] = equipo.equipo;
  });

  clasificados.segundos.forEach((equipo) => {
    const letra = equipo.grupo.replace("Grupo ", "");
    mapa[`2${letra}`] = equipo.equipo;
  });

  clasificados.mejoresTerceros.forEach((equipo) => {
    const letra = equipo.grupo.replace("Grupo ", "");
    mapa[`3${letra}`] = equipo.equipo;
  });

  return mapa;
}

export function obtenerGruposMejoresTerceros(
  clasificados: ReturnType<typeof sacarClasificados>
) {
  return clasificados.mejoresTerceros
    .map((equipo) => equipo.grupo.replace("Grupo ", ""))
    .sort();
}

export function resolverCrucesMejoresTerceros(
  clasificados: ReturnType<typeof sacarClasificados>
) {
  const grupos = obtenerGruposMejoresTerceros(clasificados);
  return getAnnexCSlots(grupos);
}