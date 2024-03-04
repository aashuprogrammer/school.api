import express from "express";
import * as path from "path";
import { randomBytes } from "crypto";
import { errorCapture } from "./error.mjs";
import { pgClient } from "../database.mjs";
import { authentication } from "../middleware/auth.mjs";
import jwt from "jsonwebtoken";
import { upload } from "../multer.mjs";
// import { sendEmail } from "../email/email.mjs";
// import { forgotPasswordTemplate } from "../email/emailTempalets.mjs";

const employeeRouter = express.Router();

employeeRouter.post(
  "/login",
  errorCapture(async (req, res) => {
    const { email, pass } = req.body;
    const data = await pgClient.query(
      `SELECT * FROM employees WHERE email = '${email}' LIMIT 1`
    );
    const employee = data.rows[0];
    if (employee.password !== pass) {
      res.statusCode = 401;
      return res.json({ error: "password is wrong" });
    }
    // Create Token //

    var token = jwt.sign(
      {
        id: employee.id,
        email: employee.email,
        name: employee.name,
        role: employee.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  })
);
//------------------------
employeeRouter.patch(
  "/forgot_password",
  errorCapture(async (req, res, next) => {
    // get email from body
    const { email } = req.body;
    // generate token
    const token = randomBytes(30).toString("hex");
    // get employee from DB

    // save random string to db
    await pgClient.query(
      `UPDATE employees SET forgot_token='${token}' WHERE email='${email}';`
    );
    // send email
    await sendEmail(
      "price",
      email,
      "Forgot Password",
      forgotPasswordTemplate(token)
    );
    res.json({ message: "password reset link sent to your email" });
  })
);

employeeRouter.patch(
  "/reset_password/:token",
  errorCapture(async (req, res, next) => {
    // get email from body
    const { token } = req.params;
    const { password } = req.body; // check password validity

    // update from token and its expiry
    const data = await pgClient.query(
      `UPDATE employees SET forgot_token='', password='${password}' WHERE forgot_token='${token}';`
    );
    if (data.rowCount !== 1) {
      throw new CustomError(null, 400, "password not updated");
    }
    res.send({ message: "password updated successfully" });
  })
);
//----------------------------------
employeeRouter.post(
  "/upload",
  authentication,
  errorCapture(upload.single("image")),
  errorCapture(async (req, res, next) => {
    // todo: save file name to employee profile photo in column name profile_photo
    console.log(req.file.fileName);
    await pgClient.query(
      `UPDATE employees SET profile_photo='${req.file.fileName}' WHERE id='${req.employee.id}'`
    );
    res.json({
      message: "file uploaded successfully",
    });
  })
);

employeeRouter.get(
  "/myprofile_photo",
  errorCapture(async (req, res, next) => {
    // TODO: get file name from DB
    const fileName = "apple.jpg";
    // await pgClient.query(
    //   `UPDATE employees SET profile_photo='${req.file.fileName}' SELECT id='${req.file.fileName}'`
    // );
    res.sendFile(path.resolve(`uploads/${fileName}`));
  })
);

export { employeeRouter };
