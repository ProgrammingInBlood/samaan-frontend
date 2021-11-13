import CreateAccount from "../../../../schema/CreateAccount";
import dbConnect from "../../../../utils/DBconnect";
import { checkJWT } from "../../../../utils/AuthMiddleware";
import jwt from "jsonwebtoken";
import timestamp from "time-stamp";

dbConnect();
export default checkJWT(async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req?.query;

    const token = jwt.decode(id);

    const User = await CreateAccount.findOne({ email: token.email });

    if (!User) {
      const result = [
        {
          firstName: token.firstName,
          lastName: token.lastName,
          email: token.email,
          password: token.password,
          timestamp: timestamp("YYYY/MM/DDTHH:mm:ss"),
          isVerified: true,
          avatar: `https://avatars.dicebear.com/api/male/${token.firstName}.svg`,
        },
      ];
      console.log(token.key);
      console.log(result);

      await CreateAccount.create(result);

      const msg = jwt.sign(
        { email: token.email, key: token.key },
        process.env.JWT_SECRET,
        {
          expiresIn: "30m",
        }
      );

      res.redirect(`/verify?token=${msg}`);
    } else {
      res
        .status(401)
        .json({ message: "account already verified", success: false });
    }
  } else {
    res.status(400).json({ message: "GET Method Missing", success: false });
  }
});
