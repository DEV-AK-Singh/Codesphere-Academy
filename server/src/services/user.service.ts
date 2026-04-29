import type { UserCreateInput, UserUpdateInput } from "../types/user.type";
import { prisma } from "../utils/prisma";

export const userSelection = {
  id: true,
  email: true,
  phone: true,
  username: true,
  isActive: true,
  role: true,
  createdAt: true,
  updatedAt: true,
};

export class UserService {
  static async CreateUser(data: UserCreateInput) {
    const userExists = await prisma.user.findUnique({ where: { email: data.email } });
    if (userExists) throw new Error("User already exists");
    const userCreated = await prisma.user.create({
      data,
      select: userSelection,
    });
    return userCreated;
  }

  static async GetUser(id: string) {
    const userExists = await prisma.user.findUnique({
      where: { id },
      select: userSelection,
    });
    if (!userExists) throw new Error("User not found");
    return userExists;
  }

  static async GetAllUsers() {
    const users = await prisma.user.findMany({
      select: userSelection,
    });
    return users;
  }

  static async UpdateUser(id: string, data: UserUpdateInput) {
    const userExists = await prisma.user.findUnique({ where: { id } });
    if (!userExists) throw new Error("User not found");
    const userUpdated = await prisma.user.update({
      where: { id },
      data,
      select: userSelection,
    });
    return userUpdated;
  }

  static async DeleteUser(id: string) {
    const userExists = await prisma.user.findUnique({ where: { id } });
    if (!userExists) throw new Error("User not found");
    const userDeleted = await prisma.user.delete({ where: { id } });
    return userDeleted;
  }
}
