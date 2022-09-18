import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

const url =
  "postgres://nimble:SnbCF8tKnYlPcoFkjAFBVFXlCx9Gnwfg@dpg-ccjbhu9gp3jn57uunhmg-a.singapore-postgres.render.com/nimble";

const AppDataSource = new DataSource({
  type: "postgres",
  url: url,
  ssl: true,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});

export { AppDataSource };
