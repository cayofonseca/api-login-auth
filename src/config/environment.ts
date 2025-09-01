import dotenv from "dotenv";

dotenv.config();

export const environment = {
    port: process.env.PORT,
    jwt_key: process.env.JWT_KEY,
};
