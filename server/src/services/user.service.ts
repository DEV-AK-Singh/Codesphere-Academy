import { prisma } from "../utils/prisma";

export class UserService {
  static async Register(
    email: string,
    phone: string,
    username: string,
    password: string,
  ) {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) throw new Error("User already exists");
    const userCreated = await prisma.user.create({
      data: { email, phone, username, password },
      select: { id: true, email: true, phone: true, username: true },
    });
    return userCreated;
  }

  static async Login(email: string, password: string) {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (!userExists) throw new Error("User not found");
    if (userExists.password !== password) throw new Error("Invalid password");
    return userExists;
  }

  static async GetUser(id: string) {
    const userExists = await prisma.user.findUnique({ where: { id }, select: { id: true, email: true, phone: true, username: true } });
    if (!userExists) throw new Error("User not found");
    return userExists;
  }

  static async GetAllUsers() {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, phone: true, username: true },
    });
    return users;
  }

  static async UpdateUser(id: string, data: any) {
    const userExists = await prisma.user.findUnique({ where: { id } });
    if (!userExists) throw new Error("User not found");
    const userUpdated = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, email: true, phone: true, username: true },
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
