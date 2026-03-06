import { AlunoRepository } from "../repository/aluno.repository";
import { Aluno } from "../models/pessoa.model";

export class AlunoService {
    constructor(private _repository = new AlunoRepository()) { }

    async criar(nome: string, email: string, matricula: string, curso: string, mediaFinal: number) {
        const aluno = new Aluno(nome,
            email,
            matricula,
            curso,
            mediaFinal
        );
        return await this._repository.create(aluno);
    }
    async selecionarTodos(): Promise<Aluno[]> {
        return await this._repository.findAll();
    }
    async deletar(id: number) {
        return await this._repository.delete(id);
    }

    async selecionaById(id: number) {
        return await this._repository.findById(id);
    }

    async editar(id: number, nome: string, email: string, matricula: string, curso: string, mediaFinal: number) {
        const aluno = new Aluno(nome,
            email,
            matricula,
            curso,
            mediaFinal);
        return await this._repository.update(id,
            aluno);
    }

}
