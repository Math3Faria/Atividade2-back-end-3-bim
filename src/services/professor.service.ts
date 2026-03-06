import { ProfessorRepository } from "../repository/professor.repository";
import { Professor } from "../models/pessoa.model";

export class ProfessorService {
    constructor(private _repository = new ProfessorRepository()) { }

    async criar(nome: string, email: string, disciplina: string, cargaHoraria: number) {
        const professor = new Professor(nome,
            email,
            disciplina,
            cargaHoraria);
        return await this._repository.create(professor);
    }

    async selecionarTodos(): Promise<Professor[]> {
        return await this._repository.findAll();
    }
    async deletar(id: number) {
        return await this._repository.delete(id);
    }
    async selecionaById(id: number) {
        return await this._repository.findById(id);
    }


    async editar(id: number, nome: string, email: string, disciplina: string, cargaHoraria: number) {
        const professor = new Professor(nome,
            email,
            disciplina,
            cargaHoraria);
        return await this._repository.update(id,
            professor
        );
    }



}
