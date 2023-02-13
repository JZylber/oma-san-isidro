export interface yearTests {
    ano: number,
    pruebas: Array<string>
}

export type ResultProps = {
    competition : string,
    availableResults: Array<yearTests>,
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

export interface ResultFilter {
    nombre?: string,
    apellido?: string,
    colegio?: string,
    nivel?: number,
    aprobado?: boolean
} 

export type School = {
    nombre : string,
    sede?: string,
    localidad?: string
}

export interface FilterProps{
    values : Array<string | number>,
    category_name: string
}