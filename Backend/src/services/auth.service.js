import { createUser, findUserByEmail } from "../dao/user.dao.js";

import { ConflictError } from "../utils/errorHandler.js";
import { signToken } from "../utils/helper.js";

export const registerUserService = async (name, email, password) => {
  const user = await findUserByEmail(email);
  console.log(user);
  if (user) throw new ConflictError("user already Exists");

  const newUser = await createUser(name, email, password);

  const token = await signToken({ id: newUser._id });

  return token;
};
export const loginUserService = async (email, password) => {
  const user = await findUserByEmail(email);
  console.log(user);

  if (!user || user.password !== password)
    throw new Error("Invalid Credentials");

  const token = await signToken({ id: user._id });

  return { token, user };
};
