import { TestQueryResults } from "../resultsTypes";
import { read, writeFile} from 'xlsx';
import { stringify } from 'csv-stringify/sync';
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';

export const extractResults = (results : TestQueryResults []) => {
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
    return({columns:columns,data:data})
}

export const processResults = async (format : string, testInfo: string,results: TestQueryResults [], printableTable: HTMLDivElement) => {
    const fileName = `resultados_${testInfo.split(" ").join("_")}.${format}`;
    const {columns,data} = extractResults(results);
    const csv_string = stringify(data,{header:true,columns:columns});
    if(format === "csv"){
        const csv_file = create_csv(csv_string);
        downloadFile(csv_file,fileName);
    } else if (format === "xlsx"){
        create_xlsx(csv_string,fileName);
    } else if (format === "pdf"){
        await create_pdf(printableTable,fileName);
    } else {
        throw Error("Unsupported format");
    }
}

const create_csv = (csv:string) => {
    return(new Blob([csv],{type: 'text/csv'}))
}
const create_xlsx = (csv:string,fileName: string) => {
    let wb = read(csv,{type: "string", raw: true});
    writeFile(wb,fileName);
}

const create_pdf = async (printableTable: HTMLDivElement,fileName: string) => {
    const canvas = await html2canvas(printableTable);
    const imgData = canvas.toDataURL('img/png',1.0);
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    const pdf = new jsPDF('p', 'mm','a4');
    let position = 0;
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
    }
    pdf.save(fileName);
};

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