import { TestQueryResults } from "../resultsTypes";
import { read, writeFile} from 'xlsx';
import { stringify } from 'csv-stringify/sync';

export const processResults = (format : string, testInfo: string,results: TestQueryResults []) => {
    const fileName = `resultados_${testInfo.split(" ").join("_")}.${format}`;
    let columns = [
            "Nombre",
            "Apellido",
            "Nivel",
            "Colegio",
        ].concat(results[0].prueba.cantidad_problemas>0?Array.from({length: results[0].prueba.cantidad_problemas}, (_, i) => `P${i + 1}`).concat(["Total"]):[]).concat(
            ["Aprobado"]
        );
    const data : Array<Array<string | number>> = results.map((result : TestQueryResults) => {
        return([
                result.participacion.participante.nombre,
                result.participacion.participante.apellido,
                result.participacion.nivel,
                `${result.participacion.colegio.nombre}${result.participacion.colegio.sede?"-"+result.participacion.colegio.sede:""}`
            ].concat(result.prueba.cantidad_problemas>0?result.resultados:[]).concat([result.aprobado?"Si":"No"])
        )});
    const csv_string = stringify(data,{header:true,columns:columns});
    let file;
    if(format === "csv"){
        file = create_csv(csv_string);
    } else if (format === "xlsx"){
        create_xlsx(csv_string,fileName);
    } else if (format === "pdf"){
        create_pdf(csv_string);
    } else {
        throw Error("Unsupported format");
    }
    file && downloadFile(file,fileName);
}

const create_csv = (csv:string) => {
    return(new Blob([csv],{type: 'text/csv'}))
}
const create_xlsx = (csv:string,fileName: string) => {
    let wb = read(csv,{type: "string", raw: true});
    writeFile(wb,fileName);
}
const create_pdf = (csv:string) => {
    
}

const downloadFile = (fileBlob : Blob, fileName: string) => {
    let a = document.createElement("a");
    document.body.appendChild(a);
    const url = URL.createObjectURL(fileBlob);
    a.href =  url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href)
    a.remove();
}