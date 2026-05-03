export type GameStatus = "start" | "playing" | "gameover" | "win";

export const MAX_WAVE = 6;

export type TacticId = "demo" | "pilot" | "interview" | "data" | "quickwin";

export interface Tactic {
  id: TacticId;
  label: string;
  short: string;
  color: string;
  hotkey: string;
  blurb: string;
  strongAgainst: StakeholderId[];
}

export type StakeholderId =
  | "skepticEng"
  | "budget"
  | "customer"
  | "director"
  | "process"
  | "vp";

export interface Stakeholder {
  id: StakeholderId;
  label: string;
  short: string;
  color: string;
  resistance: number; // hp
  points: number;
  blurb: string;
}

export interface GameInputs {
  left: boolean;
  right: boolean;
  fire: boolean;
}
