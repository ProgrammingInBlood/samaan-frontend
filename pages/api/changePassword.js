import dbConnect from "../../utils/DBconnect";
import User from "../../schema/CreateAccount";
import { compare, hash } from "bcrypt";
import { getSession } from "next-auth/client";
import { authinticated } from "../../utils/AuthMiddleware";

dbConnect();
export default authinticated(async function handler(req, res) {
  const session = await getSession({ req });
  console.log(session);
  if (req.method === "POST") {
    if (req.body.oldPassword === req.body.password) {
      res.json({
        success: false,
        message: "Old password and new password can not be same",
      });
    } else {
      const user = await User.findOne({
        email: session.user.email,
      });
      //Check hased password with DB password
      const checkPassword = await compare(req.body.oldPassword, user.password);
      //Incorrect password - send response
      if (!checkPassword) {
        res.json({ success: false, message: "Incorrect password" });
      } else {
        //Correct password - update password
        hash(req.body.password, 10, async function (err, hash) {
          if (err) {
            res.json({ success: false, message: "Error in hashing password" });
          } else {
            await User.update(
              {
                email: session.user.email,
              },
              {
                password: hash,
              }
            );
            //Send response
            res.json({ success: true, message: "Password updated" });
          }
        });
      }
    }
  } else {
    res.json({
      success: false,
      message: "Invalid request",
    });
  }
});
