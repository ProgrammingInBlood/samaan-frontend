import Products from "../../../schema/CreateAccount";
import dbConnect from "../../../utils/DBconnect";

dbConnect();
export default async function handler(req, res) {
  try {
    const userDetail = await Products.findById(req.query.id);
    let data = await userDetail;

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      avatar: data.avatar,
      id: data._id,
    };

    res.status(200).json(payload);
  } catch (err) {
    res.json({ success: false, data: err.message });
  }
}
