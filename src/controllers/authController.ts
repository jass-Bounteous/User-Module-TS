import jwt, { JwtPayload } from "jsonwebtoken";
import userTemplateCopy from "../schema/userSchema";
import { Request, Response, NextFunction, RequestHandler } from "express";
import bcrypt from "bcrypt";
import { isInValid, addUserService } from "../services/userServices";
import { generateTokens, generateAccessToken } from "../services/authServices";
import { validUserType } from "../types";

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const name: string = req.body?.name ? req.body.name : "";
    const password: string = req.body.password;

    if (!(name && password))
      return res.status(400).json({ msg: "Bad Request" });

    const dbUser: validUserType | null = await userTemplateCopy.findOne({
      name,
    }); // Use findOne instead of find

    if (!dbUser) return res.status(401).json({ msg: "Invalid Name" });

    bcrypt.compare(
      password,
      dbUser.password,
      async (err: Error | undefined, result: boolean): Promise<Response> => {
        if (err) {
          return res
            .status(500)
            .json({ msg: "Error comparing passwords:", err });
        } else {
          if (!result) {
            return res.status(401).json({ msg: "Invalid Password" });
          } else {
            const tokens = await generateTokens({ ...dbUser });

            // Update authToken in DB
            const updatedData = await userTemplateCopy.findOneAndUpdate(
              { name },
              { $set: { authToken: tokens.accessToken } },
              { new: true }
            );

            return res.json({
              msg: "Welcome " + dbUser.name,
              // data: updatedData,
              tokens,
            });
          }
        }
      }
    );
  } catch (e) {
    return res.status(500).json({ msg: "Error oocured while logging in:", e });
  }
};
const signup: RequestHandler = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const userData: validUserType = req.body;
  //   console.log(userData);
  if (isInValid(userData)) {
    res.status(400).json({ msg: "Bad request" });
    return;
  }
  try {
    // Check Duplication of Employee Code
    const dbUser = await userTemplateCopy.findOne({ email: userData.email });
    if (dbUser)
      return res.status(400).json({
        msg: "This Username has already been registered",
      });
    const saltPassword = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, saltPassword);

    console.log(userData);
    const resData = await addUserService(userData);
    console.log(resData);
    res.status(201).json({ msg: "User added successfully", data: resData });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken: string = req.headers.token
    ? req.headers.token.toString()
    : "";
  if (!refreshToken) res.status(401).json({ msg: "Bad request" });

  try {
    const user: string | JwtPayload = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
        ? process.env.REFRESH_TOKEN_SECRET.toString()
        : ""
    );

    if (typeof user == "string")
      return res.status(500).json({ msg: "Returned a string" });
    const accessToken = await generateAccessToken(user);
    // Update authToken in DB
    const updatedData = await userTemplateCopy.findOneAndUpdate(
      { email: user?._doc.email ? user._doc.email : "" },
      { $set: { authToken: accessToken } },
      { new: true }
    );
    res.status(200).json({ accessToken });
    // res.status(200).json({ accessToken, updatedData });
  } catch (e) {
    return res.status(500).json({ msg: "Error comparing tokens!" });
  }
};

export { login, signup, refreshToken };
