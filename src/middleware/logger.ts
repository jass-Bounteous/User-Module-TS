import { NextFunction, Request, Response } from "express";

const methodLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log(`Method.Entry, URL: ${req.url} type: ${req.method}`);
  next();
};

export default methodLogger;
