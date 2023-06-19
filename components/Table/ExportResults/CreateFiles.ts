import { read, writeFile} from 'xlsx';
import { stringify } from 'csv-stringify/sync';

export const processResults = async (format : string, testInfo: string,headers: Array<string>, data: Array<Array<string>>) => {
    const fileName = `resultados_${testInfo.split(" ").join("_")}.${format}`;
    const csv_string = stringify(data,{header:true,columns:headers});
    if(format === "csv"){
        const csv_file = create_csv(csv_string);
        downloadFile(csv_file,fileName);
    } else if (format === "xlsx"){
        create_xlsx(csv_string,fileName);
    } else if (format === "pdf"){
        null;
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