import { Router } from "express";
import { userController } from "../controllers/userController";
import passport from "passport";

const router = Router();

router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    userController.getAll
);

export default router;
