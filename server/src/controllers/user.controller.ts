import type { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
    static async register(req: Request, res: Response) {
        const { email, phone, username, password } = req.body;
        if (!email || !phone || !username || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        try {        
            const user = await UserService.Register(email, phone, username, password);
            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }

    static async login(req: Request, res: Response) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        try {
            const user = await UserService.Login(email, password);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }

    static async getUser(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Missing required params" });
        }
        try {
            const user = await UserService.GetUser(id as string);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }    
    }

    static async getAllUsers(_req: Request, res: Response) {
        try {
            const users = await UserService.GetAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }

    static async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Missing required params" });
        }
        const data = req.body;
        try {
            const user = await UserService.UpdateUser(id as string, data);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }

    static async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Missing required params" });
        }
        try {
            const user = await UserService.DeleteUser(id as string);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }
}