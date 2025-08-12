import { cookieOptions } from "../config/config.js";
import {
  loginUserService,
  registerUserService,
} from "../services/auth.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const register = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const token = await registerUserService(name, email, password);
  req.user = user;
  res.cookie("accessToken", token, cookieOptions);

  res.status(200).json({ message: "login success" });
});
export const login = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await loginUserService(email, password);
  console.log(token, user);
  req.user = user;
  res.cookie("accessToken", token, cookieOptions);

  res.status(200).json({ message: "login success" });
});
