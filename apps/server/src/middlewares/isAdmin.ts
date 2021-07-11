import { NextFunction } from "express";
import { HttpException } from "./error";

export function isAdmin(
  req: Express.Request,
  res: Express.Response,
  next: NextFunction
) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (req.user.isAdmin) {
    return next();
  }
  return next(new HttpException(403, "Não autorizado"));
}
