// Pixel-art sprites drawn at low res then scaled. Each sprite is a 2D array
// of color keys. "." means transparent.

export type SpriteKey = string;
export type Sprite = string[];

export function drawSprite(
  ctx: CanvasRenderingContext2D,
  sprite: Sprite,
  palette: Record<string, string>,
  x: number,
  y: number,
  pixel: number
) {
  for (let row = 0; row < sprite.length; row++) {
    const line = sprite[row];
    for (let col = 0; col < line.length; col++) {
      const ch = line[col];
      if (ch === "." || ch === " ") continue;
      const color = palette[ch];
      if (!color) continue;
      ctx.fillStyle = color;
      ctx.fillRect(x + col * pixel, y + row * pixel, pixel, pixel);
    }
  }
}

// Player ship — cyan (lochmara accent) — 11x7
export const PLAYER: Sprite = [
  ".....C.....",
  "....CCC....",
  "....CCC....",
  "..CCCCCCC..",
  ".CCCCCCCCC.",
  "CCC.CCC.CCC",
  "C.C.....C.C",
];

// Stakeholders — distinct silhouettes, 11x8
export const ENEMY_ENG: Sprite = [
  "...EEEEE...",
  "..EEEEEEE..",
  ".E.E.E.E.E.",
  "EEEEEEEEEEE",
  "EE.EEEEE.EE",
  ".EEEEEEEEE.",
  "..E.....E..",
  ".E.E...E.E.",
];

export const ENEMY_BUDGET: Sprite = [
  "..BBBBBBB..",
  ".B.B.B.B.B.",
  "BBBBBBBBBBB",
  "B.BB$BB.B.B",
  "BBB$$$$BBBB",
  "B.BB$BB.B.B",
  ".B.BBBBB.B.",
  "..B.....B..",
];

export const ENEMY_CUSTOMER: Sprite = [
  "....UUU....",
  "...UUUUU...",
  "..UU.U.UU..",
  ".UUUUUUUUU.",
  "U.U.UUU.U.U",
  "UUUU.UUUUUU",
  ".UU.U.U.UU.",
  "U..U...U..U",
];

export const ENEMY_DIRECTOR: Sprite = [
  ".DDDDDDDDD.",
  "DDDDDDDDDDD",
  "DD.DDDDD.DD",
  "DDDDD.DDDDD",
  "DDDDDDDDDDD",
  ".DD.DDD.DD.",
  "DD.DDDDD.DD",
  ".D.D...D.D.",
];

export const ENEMY_PROCESS: Sprite = [
  "PPPPPPPPPPP",
  "P.P.P.P.P.P",
  "PP.PPPPP.PP",
  "PPPPPPPPPPP",
  "P.PPPPPPP.P",
  "PP.PPPPP.PP",
  "P.P.....P.P",
  ".P.P...P.P.",
];

// VP boss — wider, 13x9 (used at row 0)
export const ENEMY_VP: Sprite = [
  "...VVVVVVV...",
  "..VVVVVVVVV..",
  ".VVV.VVV.VVV.",
  "VVVVVVVVVVVVV",
  "VV.VVVCVV.VVV",
  "VVVVVVVVVVVVV",
  ".VVV.VVV.VVV.",
  "..V.V...V.V..",
  ".V...V.V...V.",
];

// Advocate state — converted (cream/cyan + smile)
export const ADVOCATE: Sprite = [
  "..AAAAAAA..",
  ".AAAAAAAAA.",
  "AAAAAAAAAAA",
  "AA.AA.AA.AA",
  "AAAAAAAAAAA",
  "AA.AAAAA.AA",
  ".AAA...AAA.",
  "..AAAAAAA..",
];
