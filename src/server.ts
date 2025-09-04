import express from "express";
import { environment } from "./config/environment";
import registerRoutes from "./routes/registerRoutes";
import getAllUsersRoutes from "./routes/getAllUsersRoutes";
import loginRoutes from "./routes/loginRoutes";
import updateUserRoutes from "./routes/updateUserRoutes";
import passport from "./middleware/passportStrategy";

const server = express();

server.use(express.json());
server.use(passport.initialize());

server.use("/register", registerRoutes);
server.use("/users", getAllUsersRoutes);
server.use("/login", loginRoutes);
server.use("/users", updateUserRoutes);

server.listen(environment.port, () => {
    console.log(`O servidor está rodando na porta ${environment.port}`);
});
