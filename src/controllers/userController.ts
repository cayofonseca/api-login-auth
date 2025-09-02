import { userService } from "../services/userService";
import { Request, Response } from "express";

export const userController = {
    register: async (req: Request, res: Response) => {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ message: "Nome, email e senha são obrigatórios" });
        }
        const newUser = await userService.register(name, email, password);
        return res.status(201).json(newUser);
    },
    getAll: async (_req: Request, res: Response) => {
        const users = await userService.listAll();
        return res.json(users);
    },
};
