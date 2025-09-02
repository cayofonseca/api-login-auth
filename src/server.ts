import express from "express";
import { environment } from "./config/environment";
import registerRoutes from "./routes/registerRoutes";

const server = express();

server.use(express.json());

server.use("/register", registerRoutes);

server.listen(environment.port, () => {
    console.log(`O servidor está rodando na porta ${environment.port}`);
});
