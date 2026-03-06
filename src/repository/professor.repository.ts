import { db } from "../database/connection.database";
import { Professor } from "../models/pessoa.model";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

export class ProfessorRepository {

    async findAll(): Promise<Professor[]> {
        const [rows] = await db.execute<RowDataPacket[]>(
            "SELECT * FROM professores;");
        return rows.map(row => new Professor(
            row.nome,
            row.email,
            row.disciplina,
            Number(row.cargaHoraria)
        ));
    }
    async create(prof: Professor): Promise<ResultSetHeader> {
        const sql = `INSERT INTO professores (nome, email, disciplina, cargaHoraria)VALUES (?, ?, ?, ?);`;
        const values = [
            prof.nome,
            prof.email,
            prof.disciplina,
            prof.cargaHoraria
        ];
        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result;
    }
    async delete(id: number): Promise<ResultSetHeader> {
        const sql = "DELETE FROM professores WHERE id=?;";
        const [result] = await db.execute<ResultSetHeader>(sql, [id]);
        return result;
    }

    async findById(id: number): Promise<Professor | undefined> {
        const sql = "SELECT * FROM professores WHERE id = ?;";
        const [rows] = await db.execute<RowDataPacket[]>(sql, [id]);

        if (rows.length === 0) return undefined;

        const res = rows[0];
        return new Professor(
            res.nome,
            res.email,
            res.disciplina,
            res.cargaHoraria
        );
    }



    async update(id: number, prof: Professor): Promise<ResultSetHeader> {
        const sql = "UPDATE professores SET nome = ?, email = ?, disciplina = ?, cargaHoraria = ? WHERE id = ?";

        const values = [
            prof.nome,
            prof.email,
            prof.disciplina,
            prof.cargaHoraria,
            id
        ];

        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result;
    }

}
