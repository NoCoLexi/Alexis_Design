import type { Store, Options, IncrementResponse } from "express-rate-limit";
import { pool } from "@workspace/db";

const PRUNE_INTERVAL_MS = 5 * 60 * 1000;

export class PgRateLimitStore implements Store {
  private windowMs: number = 60_000;
  readonly #policy: string;

  constructor(policy: string) {
    this.#policy = policy;
  }

  init(options: Options): void {
    this.windowMs = options.windowMs as number;
    const timer = setInterval(() => {
      this.pruneExpired().catch(() => {});
    }, PRUNE_INTERVAL_MS);
    timer.unref();
  }

  private async pruneExpired(): Promise<void> {
    await pool.query(
      "DELETE FROM rate_limit_entries WHERE reset_time <= NOW() AND key LIKE $1",
      [`${this.#policy}:%`],
    );
  }

  private scopedKey(key: string): string {
    return `${this.#policy}:${key}`;
  }

  async increment(key: string): Promise<IncrementResponse> {
    const now = new Date();
    const resetTime = new Date(now.getTime() + this.windowMs);
    const scopedKey = this.scopedKey(key);

    const result = await pool.query<{ hits: number; reset_time: Date }>(
      `
      INSERT INTO rate_limit_entries (key, hits, reset_time)
      VALUES ($1, 1, $2)
      ON CONFLICT (key) DO UPDATE
        SET
          hits       = CASE
                         WHEN rate_limit_entries.reset_time <= NOW()
                         THEN 1
                         ELSE rate_limit_entries.hits + 1
                       END,
          reset_time = CASE
                         WHEN rate_limit_entries.reset_time <= NOW()
                         THEN $2
                         ELSE rate_limit_entries.reset_time
                       END
      RETURNING hits, reset_time
      `,
      [scopedKey, resetTime],
    );

    const row = result.rows[0];
    return {
      totalHits: row.hits,
      resetTime: row.reset_time,
    };
  }

  async decrement(key: string): Promise<void> {
    await pool.query(
      `
      UPDATE rate_limit_entries
      SET hits = GREATEST(hits - 1, 0)
      WHERE key = $1 AND reset_time > NOW()
      `,
      [this.scopedKey(key)],
    );
  }

  async resetKey(key: string): Promise<void> {
    await pool.query("DELETE FROM rate_limit_entries WHERE key = $1", [
      this.scopedKey(key),
    ]);
  }

  async resetAll(): Promise<void> {
    await pool.query(
      "DELETE FROM rate_limit_entries WHERE key LIKE $1",
      [`${this.#policy}:%`],
    );
  }
}
