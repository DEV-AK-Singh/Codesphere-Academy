import type { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
    static async register(req: Request, res: Response) {
        const { name, phone, email, password } = req.body;
        if (!name || !phone || !email || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const user = await UserService.Register({ name, phone, email, password });
        return res.status(201).json(user);
    },

    static async login(req: Request, res: Response) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const user = await UserService.Login({ email, password });
        return res.status(200).json(user);
    }
}