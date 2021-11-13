import Products from "../../../schema/Products";
import dbConnect from "../../../utils/DBconnect";

dbConnect();
export default async function handler(req, res) {
  if (req.method === "GET") {
    const autocomplete = await Products.aggregate([
      {
        $search: {
          autocomplete: {
            query: req.query.search,
            path: "name",
            fuzzy: {
              maxEdits: 2,
            },
          },
        },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          _id: 1,
          name: 1,
        },
      },
    ]);
    res.status(200).json(autocomplete);
  } else {
    res.status(500).json({ message: "GET query missing" });
  }
}
