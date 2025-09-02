import prisma from "../libs/prisma";
import { User } from "@prisma/client";

export const userRepository = {
    register: async (data: User) => {
        return await prisma.user.create({ data });
    },
};
