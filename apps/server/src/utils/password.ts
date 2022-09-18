import brcypt from "bcrypt";
import logger from "jet-logger";

const SALT_ROUNDS = 10;

async function hashPassword(password: string): Promise<string | null> {
  try {
    return await brcypt.hash(password, SALT_ROUNDS);
  } catch (err) {
    logger.err(err, true);
    return null;
  }
}

async function comparePassword(input: string, real: string) {
  try {
    return await brcypt.compare(input, real);
  } catch (err) {
    logger.err(err, true);
    return false;
  }
}

export default { hashPassword, comparePassword } as const;
