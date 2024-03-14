import express from "express";
import { errorCapture } from "./error.mjs";

const admissionRouter = express.Router();
admissionRouter.get(
  "/",
  errorCapture(async (req, res) => {
    const data = await pgClient.query(
      "SELECT admission.id AS admission_id,student_id,name,father_name,class from admission INNER JOIN studdents ON admission.student_id = students.id"
    );
    res.json({ admission: data.rows });
  })
);

export { admissionRouter };
