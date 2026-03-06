import { Router } from "express";
import { AlunoController } from "../controllers/aluno.controller";

const router = Router();
const controller = new AlunoController();

router.post("/alunos", controller.criar);
router.get("/alunos", controller.selecionarTodos);
router.get("/alunos/buscaID", controller.selecionaById);
router.delete("/alunos", controller.deletar);

router.put("/alunos", controller.editar);


export default router;
