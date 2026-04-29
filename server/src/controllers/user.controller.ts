import type { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {  
    static async create(req: Request, res: Response) { 
        const userRole = await UserService.GetUserRole(req.user?.userId as string);
        if (userRole !== "ADMIN") {
            return res.status(403).json({ error: "Forbidden access!" });
        }
        const data = req.body;
        try {
            const user = await UserService.CreateUser(data);
            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }

    static async get(req: Request, res: Response) {
        const userRole = await UserService.GetUserRole(req.user?.userId as string);
        if (userRole !== "ADMIN" && userRole !== "MODERATOR") {
            return res.status(403).json({ error: "Forbidden access!" });
        }
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

    static async getAll(req: Request, res: Response) {
        const userRole = await UserService.GetUserRole(req.user?.userId as string);
        if (userRole !== "ADMIN" && userRole !== "MODERATOR") {
            return res.status(403).json({ error: "Forbidden access!" });
        }
        try {
            const users = await UserService.GetAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }

    static async update(req: Request, res: Response) {
        const userRole = await UserService.GetUserRole(req.user?.userId as string);
        if (userRole !== "ADMIN") {
            return res.status(403).json({ error: "Forbidden access!" });
        }
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

    static async delete(req: Request, res: Response) {
        const userRole = await UserService.GetUserRole(req.user?.userId as string);
        if (userRole !== "ADMIN") {
            return res.status(403).json({ error: "Forbidden access!" });
        }
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