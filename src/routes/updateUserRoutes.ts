import { Router } from "express";
import { userController } from "../controllers/userController";
import passport from "../middleware/passportStrategy";
import { isLogged } from "../middleware/isLogged";

const router = Router();

router.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    isLogged,
    userController.update
);

export default router;
