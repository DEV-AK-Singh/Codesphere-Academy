import bcrypt from "bcrypt";
import { prisma } from "../utils/prisma.js";
import type { UserCreateInput } from "../types/user.type.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import { userSelection } from "./user.service.js";

declare global {
  namespace Express {
    interface User {
      userId: string;
      email: string; 
      username: string;
    }
  }
}

export class AuthService {
  static async Register(user: UserCreateInput) {
    const userExists = await prisma.user.findUnique({ where: { email: user.email } });
    if (userExists) throw new Error("User already exists");
    const uid = crypto.randomUUID();
    const hashPassword = await bcrypt.hash(user.password, 10);
    const accessToken = generateAccessToken({ userId: uid, email: user.email, username: user.username });
    const refreshToken = generateRefreshToken({ userId: uid, email: user.email, username: user.username });
    const userCreated = await prisma.user.create({
      data: { ...user, id: uid, password: hashPassword, refreshToken },
      select: userSelection,
    });
    return { user: userCreated, accessToken, refreshToken };
  }

  static async Login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");
    const accessToken = generateAccessToken({ userId: user.id, email: user.email, username: user.username });
    const refreshToken = generateRefreshToken({ userId: user.id, email: user.email, username: user.username });
    const userUpdated = await prisma.user.update({ where: { id: user.id }, data: { refreshToken }, select: userSelection });
    if (!userUpdated) throw new Error("User not found");
    return { user: userUpdated, accessToken, refreshToken };
  } 

  static async RefreshToken(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");
    const accessToken = generateAccessToken({ userId: user.id, email: user.email, username: user.username });
    const refreshToken = generateRefreshToken({ userId: user.id, email: user.email, username: user.username });
    await prisma.user.update({ where: { id: user.id }, data: { refreshToken } });
    return { accessToken, refreshToken };
  }

  static async Me(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: userSelection });
    if (!user) throw new Error("User not found");
    return user;
  }
}
