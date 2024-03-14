// import { date } from "drizzle-orm/mysql-core";
// import {
//   pgEnum,
//   pgTable,
//   serial,
//   text,
//   date,
//   timestamp,
// } from "drizzle-orm/pg-core";
// import { employeeModel } from "./employee.mjs";
// const genderEnum = pgEnum("gender", ["male", "female", "other"]);
// const studentsModel = pgTable("students", {
//   id: serial("id").primaryKey(),
//   employee_id: serial("id")
//     .references(() => employeeModel.id)
//     .notNull(),
//   name: text("name").notNull(),
//   fatherName: text("fatherName").notNull(),
//   motherName: text("motherName").notNull(),
//   phoneNumber: text("phoneNumber").notNull(),
//   date: date("date").notNull(),
//   createdAt: timestamp("created_at").default("now()"),
// });

// export { studentsModel };
