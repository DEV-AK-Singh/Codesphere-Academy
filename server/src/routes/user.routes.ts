import { Router } from "express";

import { UserController } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authenticate, UserController.create);
router.get("/:id", authenticate, UserController.get);
router.get("/", authenticate, UserController.getAll);
router.put("/:id", authenticate, UserController.update);
router.delete("/:id", authenticate, UserController.delete);

export default router;
