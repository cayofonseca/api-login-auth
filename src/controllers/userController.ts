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
    login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res
                    .status(400)
                    .json({ message: "Digite o login e a senha" });
            }
            const { token, user } = await userService.login(email, password);
            return res
                .status(200)
                .json({ token, user: { id: user.id, email: user.email } });
        } catch (error: any) {
            return res.status(401).json({ message: error.message });
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const userId = Number(id);
            if (isNaN(userId)) {
                return res.status(400).json({ message: "Digite um Id válido" });
            }
            if (!data || Object.keys(data).length === 0) {
                return res.status(400).json({
                    message: "Digite o id e os dados a serem atualizados",
                });
            }
            const updatedUser = await userService.update(userId, data);
            const { password, ...userWithoutPassword } = updatedUser;
            return res.status(200).json({
                message: "Usuário atualizado com sucesso",
                user: userWithoutPassword,
            });
        } catch (error: any) {
            if (error.message === "Usuário não cadastrado") {
                return res.status(404).json({ message: error.message });
            } else {
                return res
                    .status(500)
                    .json({ error: "Erro ao atualizar usuário" });
            }
        }
    },
};
