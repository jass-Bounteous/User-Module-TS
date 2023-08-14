import express, { Router } from "express";
import { login, signup, refreshToken } from "../controllers/authController";

const authRouter:Router = express.Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.post("/refreshToken", refreshToken);

export default authRouter;
