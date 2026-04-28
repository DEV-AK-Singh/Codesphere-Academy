import { prisma } from "../utils/prisma";

interface UserInput {
  name: string;
  phone: string;
  email: string;
  password: string;
}

const userSelect = {
  id: true,
  name: true,
  phone: true,
  email: true, 
  role: true,
  refreshTokens: {
    select: {
      token: true
    }
  }
};

export class UserService {
  static async Register(user: UserInput) {
    const { name, phone, email, password } = user;
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) throw new Error("User already exists");
    const userCreated = await prisma.user.create({
      data: { name, phone, email, password },
      select: { id: true, name: true, phone: true, email: true, refreshTokens: {
        select: {
          token: true
        }
      } },
    });
    return userCreated;
  },

  static async Login(user: UserInput) {
    const { email, password } = user;
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (!userExists) throw new Error("User not found");
    if (userExists.password !== password) throw new Error("Invalid password");
    return userExists;
  },
}
