export interface IPessoa {
    mostrarDados(): string;
}

export abstract class Pessoa implements IPessoa {
    private _nome: string;
    private _email: string;

    constructor(nome: string, email: string) {
        this._nome = nome;
        this._email = email;
    }

    public get nome(): string { return this._nome; }
    public get email(): string { return this._email; }

    public mostrarDados(): string {
        return `Nome: ${this._nome} | Email: ${this._email}`;
    }
}

export class Aluno extends Pessoa {
    private _matricula: string;
    private _curso: string;
    private _mediaFinal: number;

    constructor(
        nome: string,
        email: string,
        matricula: string,
        curso: string,
        mediaFinal: number
    ) {

        super(nome, email);
        this._matricula = matricula;
        this._curso = curso;
        this._mediaFinal = mediaFinal;
    }

    public get matricula(): string {
        return this._matricula;
    }

    public get curso(): string {
        return this._curso;
    }

    public get mediaFinal(): number {
        return this._mediaFinal;
    }

    public alterar(): Aluno {
        console.log("Tudo do aluno foi alterado com sucesso");
        return this;
    }

    public estaAprovado(): boolean {
        return this._mediaFinal >= 6;
    }

    public inserir(): Aluno {
        console.log("Este aluno foi adicionado");
        return this;
    }

    public mostrarDados(): string {
        return `${super.mostrarDados()} | Matrícula: ${this._matricula} | Curso: ${this._curso} | Média Final: ${this._mediaFinal}`;
    }
}

export class Professor extends Pessoa {
    private _disciplina: string;
    private _cargaHoraria: number;

    constructor(
        nome: string,
        email: string,
        disciplina: string,
        cargaHoraria: number
    ) {
        super(nome, email);
        this._disciplina = disciplina;
        this._cargaHoraria = cargaHoraria;
    }
    public get cargaHoraria(): number {
        return this._cargaHoraria
            ;
    }


    public get disciplina(): string {
        return this._disciplina
            ;
    }


    public alterar(): Professor {
        console.log("Todos os dados do professor foram alterados");
        return this;
    }
    public inserir(): Professor {
        console.log("Este professor foi adicionado");
        return this;
    }


    public mostrarDados(): string {
        return `${super.mostrarDados()} | Disciplina: ${this._disciplina} | Carga Horária: ${this._cargaHoraria}`;
    }
}
