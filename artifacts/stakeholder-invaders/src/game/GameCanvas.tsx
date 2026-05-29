import { useEffect, useRef, type RefObject } from "react";
import type { GameInputs, GameStatus, StakeholderId, TacticId } from "./types";
import { MAX_WAVE } from "./types";
import { STAKEHOLDERS, TACTICS } from "./data";
import {
  drawSprite,
  PLAYER,
  ENEMY_ENG,
  ENEMY_BUDGET,
  ENEMY_CUSTOMER,
  ENEMY_DIRECTOR,
  ENEMY_PROCESS,
  ENEMY_VP,
  ADVOCATE,
} from "./sprites";
import { sfx } from "./audio";

const W = 480;
const H = 360;
const PIXEL = 3; // each sprite pixel rendered as 3 canvas px (within 480x360 logical)

interface Player {
  x: number;
  y: number;
  w: number;
  h: number;
  cooldown: number;
  invuln: number;
}

interface Enemy {
  id: number;
  type: StakeholderId;
  col: number;
  row: number;
  x: number;
  y: number;
  w: number;
  h: number;
  hp: number;
  maxHp: number;
  alive: boolean;
  converting: number; // ms left to display ADVOCATE before falling
  shootTimer: number;
}

interface Shot {
  id: number;
  x: number;
  y: number;
  vy: number;
  tactic: TacticId;
  color: string;
}

interface EnemyShot {
  id: number;
  x: number;
  y: number;
  vy: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

interface Floater {
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
}

interface State {
  player: Player;
  enemies: Enemy[];
  shots: Shot[];
  enemyShots: EnemyShot[];
  particles: Particle[];
  floaters: Floater[];
  enemyDir: 1 | -1;
  enemySpeed: number;
  enemyDescend: number;
  wave: number;
  score: number;
  advocates: number;
  credibility: number;
  lastShootCheck: number;
  nextId: number;
  tickAcc: number;
  tickHigh: boolean;
}

interface Props {
  status: GameStatus;
  inputsRef: RefObject<GameInputs>;
  tactic: TacticId;
  muted: boolean;
  onScore: (n: number) => void;
  onAdvocates: (n: number) => void;
  onCredibility: (n: number) => void;
  onWave: (n: number) => void;
  onGameOver: (score: number, advocates: number) => void;
  onWin: (score: number, advocates: number) => void;
  onKill?: (stakeholder: StakeholderId, tactic: TacticId, wave: number) => void;
  onWaveClear?: (wave: number) => void;
}

const SPRITE_FOR: Record<StakeholderId, string[]> = {
  skepticEng: ENEMY_ENG,
  budget: ENEMY_BUDGET,
  customer: ENEMY_CUSTOMER,
  director: ENEMY_DIRECTOR,
  process: ENEMY_PROCESS,
  vp: ENEMY_VP,
};

const PALETTE_FOR: Record<StakeholderId, Record<string, string>> = {
  skepticEng: { E: "#5fc5f8" },
  budget: { B: "#F3E8B9", $: "#0081BC" },
  customer: { U: "#d4546c" },
  director: { D: "#6D5592" },
  process: { P: "#9bd9ff" },
  vp: { V: "#013B72", C: "#F3E8B9" },
};

function buildWave(wave: number): Enemy[] {
  // Choose roster by wave; wave 1 small, then grows; every 3rd wave has a VP boss
  const cols = Math.min(8, 5 + Math.floor((wave - 1) / 2));
  const types: StakeholderId[] = [];
  if (wave % 3 === 0) types.push("vp");
  types.push("director", "budget", "process", "customer", "skepticEng");
  const rows = Math.min(types.length, wave % 3 === 0 ? 5 : 4);

  const enemies: Enemy[] = [];
  let id = 1;
  const startY = 36;
  const colW = 38;
  const rowH = 30;
  const totalWidth = cols * colW;
  const startX = (W - totalWidth) / 2 + 6;

  for (let r = 0; r < rows; r++) {
    const t = types[r];
    const sprite = SPRITE_FOR[t];
    const w = sprite[0].length * PIXEL;
    const h = sprite.length * PIXEL;
    for (let c = 0; c < cols; c++) {
      // VP boss only spawns one centered enemy in row 0
      if (t === "vp" && c !== Math.floor(cols / 2)) continue;
      const meta = STAKEHOLDERS[t];
      enemies.push({
        id: id++,
        type: t,
        col: c,
        row: r,
        x: startX + c * colW,
        y: startY + r * rowH,
        w,
        h,
        hp: meta.resistance,
        maxHp: meta.resistance,
        alive: true,
        converting: 0,
        shootTimer: 1500 + Math.random() * 4000,
      });
    }
  }
  return enemies;
}

function makePlayer(): Player {
  const sw = PLAYER[0].length * PIXEL;
  const sh = PLAYER.length * PIXEL;
  return {
    x: W / 2 - sw / 2,
    y: H - sh - 12,
    w: sw,
    h: sh,
    cooldown: 0,
    invuln: 0,
  };
}

function initState(wave = 1, credibility = 3, score = 0, advocates = 0): State {
  return {
    player: makePlayer(),
    enemies: buildWave(wave),
    shots: [],
    enemyShots: [],
    particles: [],
    floaters: [],
    enemyDir: 1,
    enemySpeed: 18 + (wave - 1) * 4,
    enemyDescend: 10 + (wave - 1) * 1.5,
    wave,
    score,
    advocates,
    credibility,
    lastShootCheck: 0,
    nextId: 1,
    tickAcc: 0,
    tickHigh: true,
  };
}

export function GameCanvas(props: Props) {
  const { status, inputsRef, tactic, muted, onScore, onAdvocates, onCredibility, onWave, onGameOver, onWin, onKill, onWaveClear } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<State | null>(null);
  const tacticRef = useRef<TacticId>(tactic);
  const mutedRef = useRef<boolean>(muted);
  const statusRef = useRef<GameStatus>(status);

  useEffect(() => { tacticRef.current = tactic; }, [tactic]);
  useEffect(() => { mutedRef.current = muted; }, [muted]);
  useEffect(() => {
    statusRef.current = status;
    if (status === "playing") {
      stateRef.current = initState(1, 3, 0, 0);
      onScore(0); onAdvocates(0); onCredibility(3); onWave(1);
      sfx.wave(mutedRef.current);
    }
  }, [status, onScore, onAdvocates, onCredibility, onWave]);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    let raf = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const dtMs = Math.min(50, now - last);
      last = now;
      const dt = dtMs / 1000;

      step(dt);
      render(ctx);
      raf = requestAnimationFrame(loop);
    };

    const step = (dt: number) => {
      const s = stateRef.current;
      if (!s || statusRef.current !== "playing") return;

      // Player movement
      const speed = 200;
      const inputs = inputsRef.current;
      if (inputs.left) s.player.x -= speed * dt;
      if (inputs.right) s.player.x += speed * dt;
      s.player.x = Math.max(6, Math.min(W - s.player.w - 6, s.player.x));

      // Fire
      s.player.cooldown -= dtMs(dt);
      if (inputs.fire && s.player.cooldown <= 0) {
        const t = TACTICS.find((x) => x.id === tacticRef.current)!;
        s.shots.push({
          id: s.nextId++,
          x: s.player.x + s.player.w / 2 - 1,
          y: s.player.y - 4,
          vy: -340,
          tactic: t.id,
          color: t.color,
        });
        s.player.cooldown = 320;
        sfx.shoot(mutedRef.current);
      }

      // Update shots
      for (const sh of s.shots) sh.y += sh.vy * dt;
      s.shots = s.shots.filter((x) => x.y > -10);

      for (const es of s.enemyShots) es.y += es.vy * dt;
      s.enemyShots = s.enemyShots.filter((x) => x.y < H + 10);

      // Enemy movement (group)
      const aliveActive = s.enemies.filter((e) => e.alive && e.converting === 0);
      if (aliveActive.length > 0) {
        let minX = Infinity, maxX = -Infinity;
        for (const e of aliveActive) {
          if (e.x < minX) minX = e.x;
          if (e.x + e.w > maxX) maxX = e.x + e.w;
        }
        const dx = s.enemyDir * s.enemySpeed * dt;
        let descend = 0;
        if ((s.enemyDir === 1 && maxX + dx > W - 8) || (s.enemyDir === -1 && minX + dx < 8)) {
          s.enemyDir = (s.enemyDir === 1 ? -1 : 1) as 1 | -1;
          descend = s.enemyDescend;
          // Speed up slightly each descent
          s.enemySpeed = Math.min(120, s.enemySpeed + 4);
        }
        for (const e of s.enemies) {
          if (!e.alive) continue;
          if (e.converting > 0) {
            e.y += 60 * dt; // converted enemies fall
            e.converting -= dtMs(dt);
            if (e.converting <= 0 || e.y > H + 20) e.alive = false;
            continue;
          }
          e.x += dx;
          e.y += descend;
        }
      }

      // Enemy shooting
      const shooters = s.enemies.filter((e) => e.alive && e.converting === 0);
      for (const e of shooters) {
        e.shootTimer -= dtMs(dt);
        if (e.shootTimer <= 0) {
          // Random column shooter only fires if no other living enemy below
          const below = shooters.find(
            (o) => o !== e && o.col === e.col && o.row > e.row
          );
          if (!below) {
            s.enemyShots.push({
              id: s.nextId++,
              x: e.x + e.w / 2 - 1,
              y: e.y + e.h,
              vy: 140 + s.wave * 6,
            });
            sfx.enemyShoot(mutedRef.current);
          }
          e.shootTimer = 2200 + Math.random() * 4500 - s.wave * 80;
          if (e.shootTimer < 600) e.shootTimer = 600;
        }
      }

      // Collisions: shots hit enemies
      for (const sh of s.shots) {
        for (const e of s.enemies) {
          if (!e.alive || e.converting > 0) continue;
          if (sh.x >= e.x && sh.x <= e.x + e.w && sh.y >= e.y && sh.y <= e.y + e.h) {
            sh.y = -100; // remove
            const t = TACTICS.find((x) => x.id === sh.tactic)!;
            const strong = t.strongAgainst.includes(e.type);
            const dmg = strong ? 2 : 1;
            e.hp -= dmg;
            spawnParticles(s, sh.x, sh.y, sh.color, 4);
            sfx.hit(mutedRef.current);
            if (strong) {
              s.floaters.push({ x: e.x + e.w / 2, y: e.y - 4, text: "RESONATES!", color: t.color, life: 700 });
            }
            if (e.hp <= 0) {
              e.converting = 900;
              const meta = STAKEHOLDERS[e.type];
              const bonus = strong ? Math.round(meta.points * 1.5) : meta.points;
              s.score += bonus;
              s.advocates += 1;
              spawnParticles(s, e.x + e.w / 2, e.y + e.h / 2, "#F3E8B9", 14);
              s.floaters.push({ x: e.x + e.w / 2, y: e.y, text: `ADVOCATE! +${bonus}`, color: "#F3E8B9", life: 1000 });
              sfx.convert(mutedRef.current);
              onScore(s.score);
              onAdvocates(s.advocates);
              onKill?.(e.type, sh.tactic, s.wave);
            }
            break;
          }
        }
      }
      s.shots = s.shots.filter((x) => x.y > -10);

      // Enemy shots hit player
      if (s.player.invuln > 0) s.player.invuln -= dtMs(dt);
      for (const es of s.enemyShots) {
        if (
          s.player.invuln <= 0 &&
          es.x >= s.player.x &&
          es.x <= s.player.x + s.player.w &&
          es.y >= s.player.y &&
          es.y <= s.player.y + s.player.h
        ) {
          es.y = H + 100;
          s.credibility -= 1;
          s.player.invuln = 1200;
          spawnParticles(s, s.player.x + s.player.w / 2, s.player.y, "#d4546c", 10);
          sfx.hurt(mutedRef.current);
          onCredibility(s.credibility);
          if (s.credibility <= 0) {
            sfx.gameOver(mutedRef.current);
            onGameOver(s.score, s.advocates);
            return;
          }
        }
      }
      s.enemyShots = s.enemyShots.filter((x) => x.y < H + 10);

      // Enemies reaching player line = political loss
      for (const e of s.enemies) {
        if (e.alive && e.converting === 0 && e.y + e.h >= s.player.y - 4) {
          sfx.gameOver(mutedRef.current);
          onGameOver(s.score, s.advocates);
          return;
        }
      }

      // Particles
      for (const p of s.particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 80 * dt;
        p.life -= dtMs(dt);
      }
      s.particles = s.particles.filter((p) => p.life > 0);

      for (const f of s.floaters) {
        f.y -= 18 * dt;
        f.life -= dtMs(dt);
      }
      s.floaters = s.floaters.filter((f) => f.life > 0);

      // Tense ticking — pace based on lowest enemy
      const lowestY = aliveActive.reduce((m, e) => Math.max(m, e.y + e.h), 0);
      const proximity = Math.min(1, lowestY / (s.player.y - 20));
      s.tickAcc += dtMs(dt);
      const interval = 900 - proximity * 700;
      if (s.tickAcc >= interval) {
        s.tickAcc = 0;
        s.tickHigh = !s.tickHigh;
        sfx.tick(mutedRef.current, s.tickHigh);
      }

      // Wave clear?
      const stillThreat = s.enemies.some((e) => e.alive && e.converting === 0);
      if (!stillThreat) {
        const wavesCompleted = s.wave;
        const carryScore = s.score + 250; // wave bonus
        if (wavesCompleted >= MAX_WAVE) {
          // Final victory: every wave cleared.
          const finalScore = carryScore + 1000; // coalition bonus
          onScore(finalScore);
          sfx.wave(mutedRef.current);
          onWin(finalScore, s.advocates);
          return;
        }
        const nextWave = wavesCompleted + 1;
        const carryCred = Math.min(5, s.credibility + 1); // recover a little
        const advs = s.advocates;
        onWaveClear?.(wavesCompleted);
        stateRef.current = initState(nextWave, carryCred, carryScore, advs);
        onScore(carryScore);
        onCredibility(carryCred);
        onWave(nextWave);
        sfx.wave(mutedRef.current);
      }
    };

    const render = (g: CanvasRenderingContext2D) => {
      g.fillStyle = "#08080A";
      g.fillRect(0, 0, W, H);

      // Starfield (deterministic via simple hashing)
      g.fillStyle = "rgba(95,197,248,0.18)";
      for (let i = 0; i < 40; i++) {
        const sx = (i * 73) % W;
        const sy = (i * 131 + (performance.now() * 0.01 * (i % 3 + 1))) % H;
        g.fillRect(sx, sy, 1, 1);
      }

      const s = stateRef.current;
      if (!s) return;

      // Player
      const pal = { C: s.player.invuln > 0 && Math.floor(performance.now() / 80) % 2 === 0 ? "#d4546c" : "#5fc5f8" };
      drawSprite(g, PLAYER, pal, s.player.x, s.player.y, PIXEL);

      // Player baseline
      g.fillStyle = "rgba(95,197,248,0.25)";
      g.fillRect(0, s.player.y + s.player.h + 4, W, 1);

      // Enemies
      for (const e of s.enemies) {
        if (!e.alive) continue;
        if (e.converting > 0) {
          drawSprite(g, ADVOCATE, { A: "#F3E8B9" }, e.x, e.y, PIXEL);
          // glow
          g.fillStyle = "rgba(109,85,146,0.25)";
          g.fillRect(e.x - 2, e.y - 2, e.w + 4, e.h + 4);
          g.fillStyle = "#F3E8B9";
          g.font = "8px 'Press Start 2P', monospace";
          g.textAlign = "center";
          g.fillText("ADVOCATE!", e.x + e.w / 2, e.y - 4);
        } else {
          drawSprite(g, SPRITE_FOR[e.type], PALETTE_FOR[e.type], e.x, e.y, PIXEL);
          // hp bar if damaged
          if (e.hp < e.maxHp) {
            const barW = e.w;
            g.fillStyle = "rgba(212,84,108,0.3)";
            g.fillRect(e.x, e.y - 3, barW, 2);
            g.fillStyle = "#d4546c";
            g.fillRect(e.x, e.y - 3, (barW * e.hp) / e.maxHp, 2);
          }
        }
      }

      // Shots
      for (const sh of s.shots) {
        g.fillStyle = sh.color;
        g.fillRect(sh.x - 1, sh.y - 5, 3, 8);
      }
      for (const es of s.enemyShots) {
        g.fillStyle = "#d4546c";
        g.fillRect(es.x - 1, es.y, 2, 6);
      }

      // Particles
      for (const p of s.particles) {
        g.globalAlpha = Math.max(0, p.life / p.maxLife);
        g.fillStyle = p.color;
        g.fillRect(p.x, p.y, 2, 2);
      }
      g.globalAlpha = 1;

      // Floaters
      g.font = "8px 'Press Start 2P', monospace";
      g.textAlign = "center";
      for (const f of s.floaters) {
        g.globalAlpha = Math.min(1, f.life / 700);
        g.fillStyle = f.color;
        g.fillText(f.text, f.x, f.y);
      }
      g.globalAlpha = 1;
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [inputsRef, onAdvocates, onCredibility, onGameOver, onScore, onWave, onWin]);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      className="absolute inset-0 w-full h-full"
      style={{ imageRendering: "pixelated", display: "block" }}
    />
  );
}

function dtMs(dt: number) {
  return dt * 1000;
}

function spawnParticles(s: State, x: number, y: number, color: string, n: number) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    const sp = 40 + Math.random() * 80;
    s.particles.push({
      x,
      y,
      vx: Math.cos(a) * sp,
      vy: Math.sin(a) * sp,
      life: 400 + Math.random() * 300,
      maxLife: 700,
      color,
    });
  }
}
