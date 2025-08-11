import jsonwebtoken from "jsonwebtoken";
import { nanoid } from "nanoid";
export const generateNanoId = (length) => {
  return nanoid(length);
};

export const signToken = async (payload) => {
  return await jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token) => {
  const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
  console.log("decoded", decoded);
  return decoded;
};
