// import { bigint, timestamp } from "drizzle-orm/mysql-core";
// import { studentsModel } from "./students.mjs";
// import { bigserial, pgTable, serial, text } from "drizzle-orm/pg-core";
// const admissionModel = pgTable("admission", {
//   id: serial("id").primaryKey(),
//   student_id: serial("id")
//     .references(() => studentsModel.id)
//     .notNull(),
//   class: text("class").notNull(),
//   createdAt: timestamp("created_at").default("now()"),
// });

// export { admissionModel };
