import { verify } from "jsonwebtoken";
import { getSession } from "next-auth/client";

export const authinticated = (fn) => async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    return await fn(req, res);
  }
  res.status(401).json({ message: "user not authenticated" });
};

export const checkJWT = (fn) => async (req, res) => {
  verify(req.query.id, process.env.JWT_SECRET, async function (err, decoded) {
    if (!err && decoded) {
      return await fn(req, res);
    }
    res.status(401).json({ message: "user not authenticated" });
  });
};