import { Request, Response } from "express";
import { AlunoService } from "../services/aluno.service";

export class AlunoController {

    constructor(private _service = new AlunoService()) { }
    criar = async (req: Request, res: Response) => {
        try {
            const { nome, email, matricula, curso, mediaFinal } = req.body;
            const aluno = await this._service.criar(
                nome,
                email,
                matricula,
                curso,
                mediaFinal
            );
            res.status(201).json(aluno);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erro no servidor"
            });
        }
    }

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const alunos = await this._service.selecionarTodos();
            res.status(200).json(alunos);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erro no servidor"
            });

        }
    }

    deletar = async (req: Request, res: Response) => {
        try {
            const id = Number(req.body.id);
            if (!id) {
                return res.status(400).json({
                    message: "ID inválido"
                });
            }
            const result = await this._service.deletar(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Este aluno não foi encontrado na base de dados"
                });
            }
            res.status(200).json({
                message: "O aluno foi excluído da base de dados"
            });

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
                return res.status(404).json({ message: "" });
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
            const { nome, email, matricula, curso, mediaFinal } = req.body;
            const aluno = await this._service.editar(
                id,
                nome,
                email,
                matricula,
                curso,
                mediaFinal
            );
            res.status(200).json(aluno);

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erro no servidor"
            });
        }
    }




}
