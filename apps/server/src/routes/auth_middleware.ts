import HttpStatusCodes from "http-status-codes";
import envVars from "@gsc/server/shared/env_var";
import { UnauthorizedError } from "@gsc/server/shared/error";
import JwtUtils from "@gsc/server/utils/jwt";
import type { RequestHandler } from "express";

interface ISessionUser {
  id: string;
  email: string;
}

const { UNAUTHORIZED } = HttpStatusCodes;

const jwtVerifyMiddleware: RequestHandler = async (req, res, next) => {
  try {
    // Extract the token
    const cookieName = envVars.cookieProps.key,
      jwt = req.signedCookies[cookieName];

    if (!jwt) {
      throw new UnauthorizedError();
    }

    // Make sure user role is an admin
    const clientData = await JwtUtils.decode<ISessionUser>(jwt);
    if (typeof clientData === "object") {
      res.locals.sessionUser = clientData;
      next();
    } else {
      throw new UnauthorizedError();
    }
  } catch (err: unknown) {
    let error: any;
    if (typeof err === "string") {
      error = err;
    } else if (err instanceof Error) {
      error = err.message;
    }
    return res.status(UNAUTHORIZED).json({ error });
  }
};

export { jwtVerifyMiddleware };
