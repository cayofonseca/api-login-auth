import { Request, Response, NextFunction } from "express";

export const isLogged = (req: Request, res: Response, next: NextFunction) => {
    const idFromParams = Number(req.params.id);
    const loggedUser = req.user as { id: number };

    if (idFromParams !== loggedUser.id) {
        return res.status(403).json({ message: "Acesso negado" });
    }
    next();
};
