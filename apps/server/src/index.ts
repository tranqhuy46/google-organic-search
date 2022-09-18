import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import logger from "jet-logger";
import { StatusCodes } from "http-status-codes";
import envVars from "@gsc/server/shared/env_var";
import { CustomError } from "@gsc/server/shared/error";
import BaseRouter from "@gsc/server/routes/index";
import { AppDataSource } from "./data_source";

const app = express();
const port = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(envVars.cookieProps.secret));

// Show routes called in console during development
if (envVars.nodeEnv === "development") {
  app.use(morgan("dev"));
}

// Security
if (envVars.nodeEnv === "production") {
  app.use(helmet());
}

app.use("/api/v1", BaseRouter);

// Error handling
app.use((err: Error | CustomError, req: Request, res: Response) => {
  logger.err(err, true);
  const status =
    err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST;
  return res.status(status).json({
    error: err.message,
  });
});

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      logger.info(
        "Server is listening on port " + port + " " + envVars.cookieProps.key
      );
    });
  })
  .catch((error) => logger.err(error, true));
