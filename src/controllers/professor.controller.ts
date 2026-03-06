import { Request, Response } from "express";
import { ProfessorService } from "../services/professor.service";

export class ProfessorController {

    constructor(private _service = new ProfessorService()) { }

    criar = async (req: Request, res: Response) => {
        try {
            const { nome, email, disciplina, cargaHoraria } = req.body;
            const professor = await this._service.criar(
                nome,
                email,
                disciplina,
                cargaHoraria
            );
            res.status(201).json(professor);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro no servidor" });
        }
    }
    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const professores = await this._service.selecionarTodos();
            res.status(200).json(professores);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro no servidor" });
        }
    }
    deletar = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id);

            if (!id) {
                return res.status(400).json({ message: "ID não está certo, confira!" });
            }

            const result = await this._service.deletar(id);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "O professor nao foi achado na base de dados" });
            }

            res.status(200).json({ message: "O professor foi excluído" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro no servidor" });
        }
    }
    selecionaById = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id);

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    message: "ID não está certo ou não fornecido confira"
                });
            }

            const aluno = await this._service.selecionaById(id);

            if (!aluno) {
                return res.status(404).json({ message: "Confira o ID, este aluno existe?" });
            }

            res.status(200).json(aluno);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro no servidor" });
        }
    }


    editar = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id);
            if (!id) {
                return res.status(400).json({
                    message: "ID inválido"
                });
            }

            const { nome, email, disciplina, cargaHoraria } = req.body;
            const professor = await this._service.editar(
                id,
                nome,
                email,
                disciplina,
                cargaHoraria
            );
            res.status(200).json(professor);
       } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erro no servidor"
            });
        }
    }
}
