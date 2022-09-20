import HttpStatusCodes from "http-status-codes";
import { User } from "@gsc/server/entity/User";
import { CustomError } from "@gsc/server/shared/error";
import { AppDataSource } from "../data_source";

/** errors */
class UserCreateFailed extends CustomError {
  public static readonly Msg = "user-create-failed-db";
  public static readonly HttpStatus = HttpStatusCodes.INTERNAL_SERVER_ERROR;
  constructor() {
    super(UserCreateFailed.Msg, UserCreateFailed.HttpStatus);
  }
}

const userRepository = AppDataSource.getRepository(User);

/** API(s) */
async function findByEmail(email: string) {
  try {
    const user = await userRepository.findOne({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
}

async function createNewUser(payload: Omit<User, "id">) {
  try {
    const result = await userRepository.insert(payload);
    const id = result.raw?.[0] as string;
    return { email: payload.email, id };
  } catch (error) {
    throw new UserCreateFailed();
  }
}

export default { findByEmail, createNewUser } as const;
