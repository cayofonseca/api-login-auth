import prisma from "../libs/prisma";
import { Prisma } from "@prisma/client";

export const userRepository = {
    create: async (data: Prisma.UserCreateInput) => {
        return await prisma.user.create({ data });
    },
    findByEmail: async (email: string) => {
        return await prisma.user.findUnique({ where: { email } });
    },
    findById: async (id: number) => {
        return await prisma.user.findUnique({ where: { id } });
    },
    getAll: async () => {
        return await prisma.user.findMany();
    },
    update: async (id: number, data: Prisma.UserUpdateInput) => {
        return await prisma.user.update({ where: { id }, data });
    },
};
