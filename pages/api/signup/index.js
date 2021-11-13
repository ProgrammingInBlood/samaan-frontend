import CreateAccount from "../../../schema/CreateAccount";
import dbConnect from "../../../utils/DBconnect";
import { hash } from "bcrypt";

import { sign } from "jsonwebtoken";
import { confiramtionEmail } from "../../../utils/Mailer";

dbConnect();
export default async function handler(req, res) {
  if (req.method === "POST") {
    const checkEmail = await CreateAccount.findOne({ email: req.body.email });
    if (!checkEmail) {
      hash(req.body.password, 10, async function (err, hash) {
        if (!err) {
          const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            key: req.body.password,
          };

          const jwt = sign(data, process.env.JWT_SECRET, { expiresIn: "30m" });
          await confiramtionEmail(data, jwt);

          res.status(200).json({
            success: true,
            message: `Confirmation email has been sent to ${req.body.email}`,
          });
        } else {
          res.status(404).json({
            success: false,
            message: err,
          });
        }
      });
    } else {
      res.json({
        success: false,
        message: "Email already exists. Please SignIn",
      });
    }
  } else {
    res.status(404).json({ success: false, message: "POST method missing" });
  }
}
