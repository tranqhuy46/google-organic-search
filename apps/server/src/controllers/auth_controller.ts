// import puppeteer from "puppeteer";
import HttpStatusCode from "http-status-codes";
import { body } from "express-validator";
import UserService from "@gsc/server/services/user_service";
import {
  UserAlreadyExistError,
  UserInvalidPasswordError,
  UserNotFoundError,
} from "@gsc/server/shared/error";
import PasswordUtils from "@gsc/server/utils/password";
import JwtUtils from "@gsc/server/utils/jwt";
import env_var from "@gsc/server/shared/env_var";
import { checkIfAnyError } from "@gsc/server/routes/express_validate_middleware";
import type { RequestHandler } from "express";
import type { IReq } from "@gsc/server/shared/type";
import type { ValidationChain } from "express-validator";

/** validate */
const validate = (method: "signup" | "signin") => {
  let chain: ValidationChain[] = [];
  switch (method) {
    case "signup": {
      chain.push(
        body("email")
          .exists()
          .withMessage("no-email-address-provided")
          .isEmail()
          .withMessage("invalid-email-address"),
        body("password")
          .exists()
          .withMessage("no-password-provided")
          .isStrongPassword()
          .withMessage("weak-password")
      );
      break;
    }
    case "signin": {
      chain.push(
        body("email")
          .exists()
          .withMessage("no-email-address-provided")
          .isEmail()
          .withMessage("invalid-email-address"),
        body("password").exists().withMessage("no-password-provided")
      );
      break;
    }
  }
  chain.push(checkIfAnyError as any);
  return chain;
};

export { validate };

/** API(s) */
const signup: RequestHandler = async (
  req: IReq<{
    email: string;
    password: string;
  }>,
  res,
  next
) => {
  try {
    const { email, password } = req.body;

    // NOTE: check if email exist
    const isExist = await UserService.findByEmail(email);
    if (isExist) {
      throw new UserAlreadyExistError();
    }

    // NOTE: hash password
    const hashedPassword = await PasswordUtils.hashPassword(password);

    // NOTE: create new user
    const newUser = await UserService.createNewUser(email, hashedPassword);

    // NOTE: sign jwt
    const jwt = await JwtUtils.sign({ email: newUser.email, id: newUser.id });
    const { key, options } = env_var.cookieProps;
    res.cookie(key, jwt, options);

    return res.status(HttpStatusCode.CREATED).json(newUser).end();
  } catch (error) {
    next(error);
  }
};

const signin: RequestHandler = async (
  req: IReq<{
    email: string;
    password: string;
  }>,
  res,
  next
) => {
  try {
    const { email, password } = req.body;

    // NOTE: check if email exist
    const foundUser = await UserService.findByEmail(email);

    if (!foundUser) {
      throw new UserNotFoundError();
    }

    // NOTE: validate password
    const isValidPassword = await PasswordUtils.comparePassword(
      password,
      foundUser.password
    );

    if (!isValidPassword) {
      throw new UserInvalidPasswordError();
    }

    // NOTE: sign jwt
    const jwt = await JwtUtils.sign({
      email: foundUser.email,
      id: foundUser.id,
    });
    const { key, options } = env_var.cookieProps;
    res.cookie(key, jwt, options);

    return res
      .status(HttpStatusCode.OK)
      .json({ email: foundUser.email, id: foundUser.id })
      .end();
  } catch (error) {
    next(error);
  }
};

export default {
  signup,
  signin,
} as const;
