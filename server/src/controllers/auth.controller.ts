import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import type { TokenPayload } from "../types/user.type";
import { verifyRefreshToken } from "../utils/jwt";

export class AuthController {
  static async register(req: Request, res: Response) {
    const data = req.body;
    try {
      const user = await AuthService.Register(data);
      return res.status(201).json(user);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await AuthService.Login(email, password);
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  static async refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body as { refreshToken: string }
    const { userId } = verifyRefreshToken(refreshToken) as TokenPayload;
    if (!userId) {
      return res.status(403).json({ error: "Invalid/Expired refresh token!" });
    };
    try {
      const user = await AuthService.refreshToken(userId);
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  static async me(req: Request, res: Response) {
    const { userId } = req.user as TokenPayload;
    try {
      const user = await AuthService.me(userId);
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: (error as Error).message });
    }
  }
}
