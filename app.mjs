import express from "express";
const app = express();
import { errorCapture } from "./routers/error.mjs";
import { studentRouter } from "./routers/student.mjs";
import { employeeRouter } from "./routers/employees.mjs";
import { admissionRouter } from "./routers/addmision.mjs";
import { attendanceRouter } from "./routers/attendences.mjs";
import { feesRouter } from "./routers/fee.mjs";
import bodyParser from "body-parser";
import morgan from "morgan";

app.use(morgan("method :url :response-time :status"));
app.use(bodyParser.json());
app.use("/employees", employeeRouter);
app.use("/students", studentRouter);
app.use("/admission", admissionRouter);
app.use("/fees", feesRouter);
app.use("/attendance", attendanceRouter);
app.all(
  "*",
  errorCapture(async (req, res) => {
    throw Error("route not exists");
  })
);

export { app };
