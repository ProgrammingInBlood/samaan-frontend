import upload from "../../utils/multer";
import { uploads } from "../../utils/cloudinary";
import fs from "fs";
import nextConnect from "next-connect";

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array("image"));

apiRoute.post(async (req, res) => {
  const uploader = async (path) => await uploads(path, "Images");
  const urls = [];
  const files = req.files;

  for (const file of files) {
    const { path } = file;
    const newPath = await uploader(path);
    urls.push(newPath.url);
    fs.unlinkSync(path);
  }

  res.status(200).json(urls);
});

export default apiRoute;
export const config = {
  api: {
    bodyParser: false,
  },
};
