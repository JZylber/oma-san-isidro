export interface yearTests {
    ano: number,
    pruebas: Array<{instancia: string}>
}

export type ResultProps = {
    competition : string,
    availableResults: Array<yearTests>
}

export type FilterData = {
    name : string,
    type : string,
    options? : Array<string> | Array<number>
}

export interface TestQueryResults {
    presente : boolean,
    aprobado : boolean,
    resultados : Array<string>,
    participacion : {
        nivel : number,
        colegio: {
            nombre: string,
            sede: string
        }
        participante: {
            nombre: string,
            apellido : string
        }
    }
}