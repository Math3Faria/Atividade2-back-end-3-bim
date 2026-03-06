import { Router } from "express";
import { ProfessorController } from "../controllers/professor.controller";

const router = Router();
const controller = new ProfessorController();

router.post("/professores", controller.criar);
router.get("/professores", controller.selecionarTodos);
router.delete("/professores", controller.deletar);
router.get("/professores/buscaID", controller.selecionaById);

router.put("/professores", controller.editar);


export default router;