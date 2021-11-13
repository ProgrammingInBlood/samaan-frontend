import Products from "../../../schema/Products";
import dbConnect from "../../../utils/DBconnect";

dbConnect();
export default async function handler(req, res) {
  if (req.method === "GET") {
    const { page = 1, limit = 10, search = "" } = req.query;
    var regex = new RegExp(search, "i");
    const autocomplete = await Products.find({ name: regex })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const count = await Products.countDocuments({ name: regex });


    res.status(200).json({ data: autocomplete, count: count });
  } else {
    res.status(500).json({ message: "GET query missing" });
  }
}
