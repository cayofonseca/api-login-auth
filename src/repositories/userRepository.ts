import prisma from "../libs/prisma";
import { Prisma } from "@prisma/client";

export const userRepository = {
    create: async (data: Prisma.UserCreateInput) => {
        return await prisma.user.create({ data });
    },
};
