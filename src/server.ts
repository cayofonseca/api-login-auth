import express from "express";
import { environment } from "./config/environment";

const server = express();

server.use(express.json());

server.listen(environment.port, () => {
    console.log(`O servidor está rodando na porta ${environment.port}`);
});
