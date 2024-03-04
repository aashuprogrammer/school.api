import express from "express";
import { errorCapture } from "./error.mjs";
import { pgClient } from "../database.mjs";

const attendanceRouter = express.Router();

attendanceRouter.get(
  "/",
  errorCapture(async (req, res) => {
    const data = await pgClient.query("SELECT * from attendances");
    res.json({ attendances: data.rows });
  })
);

attendanceRouter.delete(
  "/",
  errorCapture(async (req, res) => {
    const { name, father_name, phone, Stream, dob } = req.body;
    const data = await pgClient.query(
      `INSERT INTO students (name,father_name,phone,Stream,dob) VALUES ('${name}','${father_name}','${phone}','${Stream}','${dob}'); `
    );
    if (data.rowCount === 1) {
      res.json({ message: "student inserted successfully" });
    } else {
      res.statusCode = 500;
      res.json({ message: "failed to insert student" });
    }
  })
);

export { attendanceRouter };
