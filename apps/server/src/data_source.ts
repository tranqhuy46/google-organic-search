import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { KeywordReport } from "./entity/KeywordReport";
import envVars from "@gsc/server/shared/env_var";

const url =
  "postgres://nimble:SnbCF8tKnYlPcoFkjAFBVFXlCx9Gnwfg@dpg-ccjbhu9gp3jn57uunhmg-a.singapore-postgres.render.com/nimble";

const AppDataSource = new DataSource({
  type: "postgres",
  url,
  ssl: true,
  synchronize: envVars.nodeEnv !== "production",
  logging: false,
  entities: [User, KeywordReport],
  migrations: [],
  subscribers: [],
});

export { AppDataSource };
