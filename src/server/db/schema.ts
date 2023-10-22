// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  index,
  mysqlTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `queerspace_${name}`);

// export const posts = mysqlTable(
//   "post",
//   {
//     id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
//     name: varchar("name", { length: 256 }),
//     createdAt: timestamp("created_at")
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: timestamp("updatedAt").onUpdateNow(),
//   },
//   (example) => ({
//     nameIndex: index("name_idx").on(example.name),
//   })
// );

export const places = mysqlTable(
  "place",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
    address: varchar("address", { length: 256 }),
    latitude: bigint("latitude", { mode: "number" }).default(0).notNull(),
    longitude: bigint("longitude", { mode: "number" }).default(0).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (table) => ({
    nameIndex: index("name_idx").on(table.name), // this lets us query places by name
  }));

export const reviews = mysqlTable(
  "review",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    placeId: bigint("place_id", { mode: "number" }).notNull(),
    rating: bigint("rating", { mode: "number" }).notNull(),
    hasGenderNeutralBathroom: boolean('has_gender_neutral_bathroom').notNull(),
    inclusiveScore: bigint("inclusive_score", { mode: "number" }).notNull(),
    comment: varchar("comment", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (table) => ({
    placeIdIndex: index("place_id_idx").on(table.placeId), // this lets us query reviews by placeId
  }));
