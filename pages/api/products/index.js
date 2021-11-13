import Products from "../../../schema/Products";
import dbConnect from "../../../utils/DBconnect";

dbConnect();
export default async function handler(req, res) {
  try {
    const getAllProducts = await Products.find({});

    res.status(200).json(getAllProducts);
  } catch (err) {
    res.json({ success: false, data: err });
  }
}
