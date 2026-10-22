import { Router } from "express";
import * as controller from "../controllers/controller.js";

const router = Router();

router.get("/api/cards/", controller.getAll);
router.post("/api/cards/", controller.create);
router.patch("/api/cards/:id", controller.update);
router.delete("/api/cards/:id", controller.remove);

export default router;
