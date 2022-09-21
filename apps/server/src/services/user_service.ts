import UserRepo from "@gsc/server/repository/user_repo";
import { User } from "@gsc/server/entity/User";

async function findByEmail(email: string): Promise<User | null> {
  const user = await UserRepo.findByEmail(email);
  return user;
}

async function createNewUser(email: string, hashedPassword: string) {
  return await UserRepo.createNewUser({
    email,
    password: hashedPassword,
    keywordReports: [],
  });
}

export default { createNewUser, findByEmail } as const;
