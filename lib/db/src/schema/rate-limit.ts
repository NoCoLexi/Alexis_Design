import { pgTable, text, integer, timestamp, index } from "drizzle-orm/pg-core";

export const rateLimitEntries = pgTable(
  "rate_limit_entries",
  {
    key: text("key").primaryKey(),
    hits: integer("hits").notNull().default(1),
    resetTime: timestamp("reset_time", { withTimezone: true }).notNull(),
  },
  (table) => ({
    resetTimeIdx: index("rate_limit_reset_time_idx").on(table.resetTime),
  }),
);
