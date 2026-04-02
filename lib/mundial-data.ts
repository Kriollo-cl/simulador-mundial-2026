export type Partido = [string, string];

export type Grupo = {
  nombre: string;
  equipos: [string, string, string, string];
  partidos: Partido[];
};

export const teamFlagCodes: Record<string, string> = {
  "México": "mx",
  "Sudáfrica": "za",
  "Corea del Sur": "kr",
  "República Checa": "cz",

  "Canadá": "ca",
  "Bosnia y Herzegovina": "ba",
  "Catar": "qa",
  "Suiza": "ch",

  "Brasil": "br",
  "Marruecos": "ma",
  "Haití": "ht",
  "Escocia": "gb-sct",

  "Estados Unidos": "us",
  "Paraguay": "py",
  "Australia": "au",
  "Turquía": "tr",

  "Alemania": "de",
  "Curazao": "cw",
  "Costa de Marfil": "ci",
  "Ecuador": "ec",

  "Países Bajos": "nl",
  "Japón": "jp",
  "Suecia": "se",
  "Túnez": "tn",

  "Bélgica": "be",
  "Egipto": "eg",
  "Irán": "ir",
  "Nueva Zelanda": "nz",

  "España": "es",
  "Cabo Verde": "cv",
  "Arabia Saudita": "sa",
  "Uruguay": "uy",

  "Francia": "fr",
  "Senegal": "sn",
  "Irak": "iq",
  "Noruega": "no",

  "Argentina": "ar",
  "Argelia": "dz",
  "Austria": "at",
  "Jordania": "jo",

  "Portugal": "pt",
  "RD Congo": "cd",
  "Uzbekistán": "uz",
  "Colombia": "co",

  "Inglaterra": "gb-eng",
  "Croacia": "hr",
  "Ghana": "gh",
  "Panamá": "pa",
};

function crearPartidosGrupo(
  equipos: [string, string, string, string]
): Partido[] {
  const [a, b, c, d] = equipos;

  return [
    [a, b],
    [c, d],
    [a, c],
    [b, d],
    [a, d],
    [b, c],
  ];
}

function crearGrupo(
  nombre: string,
  equipos: [string, string, string, string]
): Grupo {
  return {
    nombre,
    equipos,
    partidos: crearPartidosGrupo(equipos),
  };
}

export const grupos: Grupo[] = [
  crearGrupo("Grupo A", [
    "México",
    "Sudáfrica",
    "Corea del Sur",
    "República Checa",
  ]),
  crearGrupo("Grupo B", [
    "Canadá",
    "Bosnia y Herzegovina",
    "Catar",
    "Suiza",
  ]),
  crearGrupo("Grupo C", [
    "Brasil",
    "Marruecos",
    "Haití",
    "Escocia",
  ]),
  crearGrupo("Grupo D", [
    "Estados Unidos",
    "Paraguay",
    "Australia",
    "Turquía",
  ]),
  crearGrupo("Grupo E", [
    "Alemania",
    "Curazao",
    "Costa de Marfil",
    "Ecuador",
  ]),
  crearGrupo("Grupo F", [
    "Países Bajos",
    "Japón",
    "Suecia",
    "Túnez",
  ]),
  crearGrupo("Grupo G", [
    "Bélgica",
    "Egipto",
    "Irán",
    "Nueva Zelanda",
  ]),
  crearGrupo("Grupo H", [
    "España",
    "Cabo Verde",
    "Arabia Saudita",
    "Uruguay",
  ]),
  crearGrupo("Grupo I", [
    "Francia",
    "Senegal",
    "Irak",
    "Noruega",
  ]),
  crearGrupo("Grupo J", [
    "Argentina",
    "Argelia",
    "Austria",
    "Jordania",
  ]),
  crearGrupo("Grupo K", [
    "Portugal",
    "RD Congo",
    "Uzbekistán",
    "Colombia",
  ]),
  crearGrupo("Grupo L", [
    "Inglaterra",
    "Croacia",
    "Ghana",
    "Panamá",
  ]),
];