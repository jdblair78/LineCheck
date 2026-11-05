import { Router } from "express";
import {
  getChecklists,
  getChecklistById,
  createChecklist,
  updateChecklist,
  deleteChecklist,
} from "../controllers/checklistController.js";

const router = Router();

router.get("/", getChecklists);

router.get("/:id", getChecklistById);

router.post("/", createChecklist);

router.patch("/:id", updateChecklist);

router.delete("/:id", deleteChecklist);

export default router;
