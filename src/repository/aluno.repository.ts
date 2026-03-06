import { db } from "../database/connection.database";
import { Aluno } from "../models/pessoa.model";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

export class AlunoRepository {
    async create(aluno: Aluno): Promise<ResultSetHeader> {
        const sql = "INSERT INTO alunos (nome, email, matricula, curso, mediaFinal) VALUES (?,?,?,?,?);";
        const values = [aluno.nome,
        aluno.email,
        aluno.matricula,
        aluno.curso,
        aluno.mediaFinal];
        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result;
    }
    async findAll(): Promise<Aluno[]> {
        const [rows] = await db.execute<RowDataPacket[]>(
            "SELECT * FROM alunos;");
        return rows.map(row => new Aluno(
            row.nome,
            row.email,
            row.matricula,
            row.curso,
            Number(row.mediaFinal)));
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const [result] = await db.execute<ResultSetHeader>(
            "DELETE FROM alunos WHERE id=?;", [id]);
        return result;
    } 

    async findById(id: number): Promise<Aluno | undefined> {
        const [rows] = await db.execute<RowDataPacket[]>(
            "SELECT * FROM alunos WHERE id=?;", [id]);
        if (rows.length === 0) return undefined;
        const r = rows[0];
        return new Aluno(r.nome,
            r.email,
            r.matricula,
            r.curso,
            r.mediaFina
        );
    }



    async update(id: number, aluno: Aluno): Promise<ResultSetHeader> {
        const sql = "UPDATE alunos SET nome=?, email=?, matricula=?, curso=?, mediaFinal=? WHERE id=?;";
        const values = [aluno.nome,
        aluno.email,
        aluno.matricula,
        aluno.curso,
        aluno.mediaFinal, id];
        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result;
    }


}
