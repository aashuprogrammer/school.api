// import { bigint, timestamp } from "drizzle-orm/mysql-core";

// import { bigserial, pgTable, serial, text } from "drizzle-orm/pg-core";
// import { admissionModel } from "./admission.mjs";
// const attendensModel = pgTable("admission", {
//   id: serial("id").primaryKey(),
//   admission_id: serial("id")
//     .references(() => admissionModel.id)
//     .notNull(),
//   student_id: bigserial("students", { mode: "number" }).notNull(),
//   name: text("name").notNull(),
//   class: text("class").notNull(),
//   createdAt: timestamp("created_at").default("now()"),
// });

// export { attendensModel };
