import { getSession } from "next-auth/client";
import Products from "../../../schema/CreateAccount";
import { authinticated } from "../../../utils/AuthMiddleware";
import dbConnect from "../../../utils/DBconnect";

dbConnect();
export default authinticated(async function handler(req, res) {
  if (req.method == "PATCH") {
    console.log(req.body);
    try {
      const session = await getSession({ req });
      Products.update(
        { _id: session.user.id },
        {
          $set: {
            avatar: req.body.avatar,
          },
        },
        function (err, model) {
          if (err) {
            return res.json(err);
          }
          res.status(200).json({ success: true, data: model });
        }
      );
    } catch (err) {
      res.json({ success: false, data: err.message });
    }
  } else {
    res.status(404).json({ success: false, data: "PATCH method missing" });
  }
});
