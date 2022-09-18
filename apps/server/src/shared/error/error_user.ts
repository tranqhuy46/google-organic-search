import HttpStatusCodes from "http-status-codes";
import { CustomError } from "@gsc/server/shared/error";

class UserAlreadyExistError extends CustomError {
  public static readonly Msg = "user-already-exsit";
  public static readonly HttpStatus = HttpStatusCodes.CONFLICT;

  constructor() {
    super(UserAlreadyExistError.Msg, UserAlreadyExistError.HttpStatus);
  }
}

class UserInvalidPasswordError extends CustomError {
  public static readonly Msg = "user-invalid-password";
  public static readonly HttpStatus = HttpStatusCodes.FORBIDDEN;

  constructor() {
    super(UserAlreadyExistError.Msg, UserAlreadyExistError.HttpStatus);
  }
}

export { UserAlreadyExistError, UserInvalidPasswordError };
