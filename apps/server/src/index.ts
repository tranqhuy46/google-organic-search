import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import logger from "jet-logger";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import envVars from "@gsc/server/shared/env_var";
import { CustomError } from "@gsc/server/shared/error";
import BaseRouter from "@gsc/server/routes/index";
import { AppDataSource } from "./data_source";
import type { NextFunction, Request, Response } from "express";

const app = express();
const port = envVars.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(envVars.cookieProps.secret));

// NOTE: cors setup
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

// NOTE: Show routes called in console during development
if (envVars.nodeEnv === "development") {
  app.use(morgan("dev"));
}

// Security
if (envVars.nodeEnv === "production") {
  app.use(helmet());
}

app.use("/api/v1", BaseRouter);

// Error handling
app.use(
  (
    err: Error | CustomError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    logger.err(err, true);
    const status =
      (err as any)?.HttpStatus ?? StatusCodes.INTERNAL_SERVER_ERROR;

    res.status(status).json({
      error: err.message,
    });
  }
);

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      logger.info("Server is listening on port " + port);
    });
  })
  .catch((error) => logger.err(error, true));
