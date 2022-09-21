import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import type { NextFunction, Request, Response } from "express";

export async function checkIfAnyError(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() }).end();
  } else {
    next();
  }
}
