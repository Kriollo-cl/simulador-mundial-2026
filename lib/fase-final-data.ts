export type MatchId =
  | "M73" | "M74" | "M75" | "M76" | "M77" | "M78" | "M79" | "M80"
  | "M81" | "M82" | "M83" | "M84" | "M85" | "M86" | "M87" | "M88"
  | "M89" | "M90" | "M91" | "M92" | "M93" | "M94" | "M95" | "M96"
  | "M97" | "M98" | "M99" | "M100"
  | "M101" | "M102" | "M103" | "M104";

export type SlotRef =
  | "1A" | "1B" | "1C" | "1D" | "1E" | "1F" | "1G" | "1H" | "1I" | "1J" | "1K" | "1L"
  | "2A" | "2B" | "2C" | "2D" | "2E" | "2F" | "2G" | "2H" | "2I" | "2J" | "2K" | "2L"
  | "3A" | "3B" | "3C" | "3D" | "3E" | "3F" | "3G" | "3H" | "3I" | "3J" | "3K" | "3L"
  | "W73" | "W74" | "W75" | "W76" | "W77" | "W78" | "W79" | "W80"
  | "W81" | "W82" | "W83" | "W84" | "W85" | "W86" | "W87" | "W88"
  | "W89" | "W90" | "W91" | "W92" | "W93" | "W94" | "W95" | "W96"
  | "W97" | "W98" | "W99" | "W100"
  | "W101" | "W102"
  | "L101" | "L102";

export type MatchDef = {
  id: MatchId;
  ronda: string;
  teamA: SlotRef;
  teamB: SlotRef;
};

export const matches: MatchDef[] = [
  { id: "M73", ronda: "Round of 32", teamA: "2A", teamB: "2B" },
  { id: "M74", ronda: "Round of 32", teamA: "1E", teamB: "3A" },
  { id: "M75", ronda: "Round of 32", teamA: "1F", teamB: "2C" },
  { id: "M76", ronda: "Round of 32", teamA: "1C", teamB: "2F" },
  { id: "M77", ronda: "Round of 32", teamA: "1I", teamB: "3C" },
  { id: "M78", ronda: "Round of 32", teamA: "2E", teamB: "2I" },
  { id: "M79", ronda: "Round of 32", teamA: "1A", teamB: "3C" },
  { id: "M80", ronda: "Round of 32", teamA: "1L", teamB: "3E" },
  { id: "M81", ronda: "Round of 32", teamA: "1D", teamB: "3B" },
  { id: "M82", ronda: "Round of 32", teamA: "1G", teamB: "3A" },
  { id: "M83", ronda: "Round of 32", teamA: "2K", teamB: "2L" },
  { id: "M84", ronda: "Round of 32", teamA: "1H", teamB: "2J" },
  { id: "M85", ronda: "Round of 32", teamA: "1B", teamB: "3E" },
  { id: "M86", ronda: "Round of 32", teamA: "1J", teamB: "2H" },
  { id: "M87", ronda: "Round of 32", teamA: "1K", teamB: "3D" },
  { id: "M88", ronda: "Round of 32", teamA: "2D", teamB: "2G" },

  { id: "M89", ronda: "Round of 16", teamA: "W74", teamB: "W77" },
  { id: "M90", ronda: "Round of 16", teamA: "W73", teamB: "W75" },
  { id: "M91", ronda: "Round of 16", teamA: "W76", teamB: "W78" },
  { id: "M92", ronda: "Round of 16", teamA: "W79", teamB: "W80" },
  { id: "M93", ronda: "Round of 16", teamA: "W83", teamB: "W84" },
  { id: "M94", ronda: "Round of 16", teamA: "W81", teamB: "W82" },
  { id: "M95", ronda: "Round of 16", teamA: "W86", teamB: "W88" },
  { id: "M96", ronda: "Round of 16", teamA: "W85", teamB: "W87" },

  { id: "M97", ronda: "Quarter-finals", teamA: "W89", teamB: "W90" },
  { id: "M98", ronda: "Quarter-finals", teamA: "W93", teamB: "W94" },
  { id: "M99", ronda: "Quarter-finals", teamA: "W91", teamB: "W92" },
  { id: "M100", ronda: "Quarter-finals", teamA: "W95", teamB: "W96" },

  { id: "M101", ronda: "Semi-finals", teamA: "W97", teamB: "W98" },
  { id: "M102", ronda: "Semi-finals", teamA: "W99", teamB: "W100" },

  { id: "M103", ronda: "Third-place match", teamA: "L101", teamB: "L102" },
  { id: "M104", ronda: "Final", teamA: "W101", teamB: "W102" },
];