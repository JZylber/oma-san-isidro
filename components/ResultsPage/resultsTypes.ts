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
    colegio: Array<string>,
    nivel:  Array<string>,
    aprobado: Array<string>
} 

export type School = {
    nombre : string,
    sede?: string,
    localidad?: string
}

export interface OptionFilterProps{
    values : Array<string>,
    category_name: string
    update_filter: (newValue : Array<string>) => void;
    includeSearchBar?: boolean
}

export interface TypedFilterProps{
    values : Array<string>,
    category_name: string
    update_filter: (newValue : string) => void;
}