import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";

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
};
