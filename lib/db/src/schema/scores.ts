import { sql } from "drizzle-orm";
import { pgTable, varchar, integer, timestamp, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const scoresTable = pgTable(
  "scores",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    handle: varchar("handle", { length: 3 }).notNull(),
    score: integer("score").notNull(),
    advocates: integer("advocates").notNull(),
    wave: integer("wave").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    scoreIdx: index("scores_score_idx").on(table.score),
  }),
);

export const insertScoreSchema = createInsertSchema(scoresTable).omit({
  id: true,
  createdAt: true,
});

export type InsertScore = z.infer<typeof insertScoreSchema>;
export type Score = typeof scoresTable.$inferSelect;
