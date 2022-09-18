import { validationResult } from "express-validator";
import type { NextFunction, Request, Response } from "express";

export async function checkIfAnyError(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
  } else {
    next();
  }
}
