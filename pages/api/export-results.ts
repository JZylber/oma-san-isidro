import { NextApiRequest, NextApiResponse } from "next";
import { TestQueryResults } from "../../components/ResultsPage/resultsTypes";

export default async function handle(req : NextApiRequest, res : NextApiResponse) {
    if (req.query.secret !== process.env.API_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' })
    }
    try{
        //MODULES
        const {stringify} = require("csv-stringify/sync");
        const XLSX = require("xlsx");
        const puppeteer = require('puppeteer');

        //DATA
        const {fileFormat,testInfo,results}:{fileFormat : string , testInfo: string, results : TestQueryResults[] }= req.body;
        const fileName = `resultados_${testInfo.split(" ").join("_")}.${fileFormat}`
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
        const output_string = stringify(data,{header:true,columns:columns})
        res.setHeader('Content-Type', `attachment; filename="${fileName}"`);
        if(fileFormat === 'csv'){
            res.send(output_string);
        } else if(fileFormat === 'xlsx'){
            let wb = XLSX.read(output_string,{type: "string", raw: true});
            const output_excel = XLSX.write(wb,{type: "buffer"});
            res.send(output_excel);
        } else if(fileFormat === 'pdf'){
            const browser = await puppeteer.launch({
                headless: true,
                args: [
                    "--no-sandbox",
                    "--disable-setuid-sandbox",
                    "--font-render-hinting=none",
                ],
            });
            const page = await browser.newPage();

            //To reflect CSS used for screens instead of print
            await page.emulateMediaType('screen');
            const wb = XLSX.read(output_string,{type: "string", raw: true});
            const ws = wb.Sheets.Sheet1;
            const html_table = XLSX.utils.sheet_to_html(ws, { id: "results" });
            const html_content = ` 
                <!DOCTYPE html>
                <html>
                <body>
                    <h1>Resultados ${testInfo}</h1>
                    ${html_table}    
                </body>
                </html> `;
            await page.setContent(html_content, {
                waitUntil: ["networkidle0"],
            });
            await page.addStyleTag({url: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css"});
            await page.evaluateHandle("document.fonts.ready");
            await page.evaluate(() => {
                const table = document.getElementById("results");
                table?.classList.add("table");
                const table_header = document.getElementsByTagName("tr");
                table_header[0].classList.add("table-dark");
            })
            // Downlaod the PDF
            const output_pdf = await page.pdf({
                margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
                printBackground: true,
                format: 'A4',
            });
            await browser.close();
            res.send(output_pdf);
        } else {
            res.status(400).json( {message: 'Invalid file extension'})
        }
        }
    catch (error) {
        res.status(500).json( {message: {error}})
    }
}