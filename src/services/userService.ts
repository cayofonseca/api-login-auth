import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { environment } from "../config/environment";

export const userService = {
    register: async (name: string, email: string, password: string) => {
        const existUser = await userRepository.findByEmail(email);
        if (existUser) {
            throw new Error("Usuário já cadastrado");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return userRepository.create({ name, email, password: hashedPassword });
    },
    listAll: async () => {
        return userRepository.getAll();
    },
    login: async (email: string, password: string) => {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error("Usuário não cadastrado");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                },
                environment.jwt_key as string,
                { expiresIn: "1h" }
            );

            return {
                token,
                user: { id: user.id, name: user.name, email: user.email },
            };
        } else {
            throw new Error("Credenciais inválidas");
        }
    },
    update: async (
        id: number,
        data: Partial<{ name: string; email: string; password: string }>
    ) => {
        if (!id || Object.keys(data).length === 0) {
            throw new Error("Insira o id e os dados a serem atualizados");
        }
        const user = await userRepository.findById(id);
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        const updateData: any = { ...data };
        if (data.password) {
            const salt = 10;
            updateData.password = await bcrypt.hash(data.password, salt);
        }
        return await userRepository.update(id, updateData);
    },
};
