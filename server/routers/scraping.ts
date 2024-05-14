import { router, publicProcedure } from '../trpc';
import { JSDOM } from 'jsdom';
import got from 'got';
import { Book } from '../../app/(public)/otros/libros/libros';

export const scraperRouter = router({
    getBooks : publicProcedure
    .query(async () => {
        const html = (await got("https://www.oma.org.ar/red/index.php")).body;
        const dom = new JSDOM(html);
        const form = dom.window.document.querySelector("form");
        let books : Book[] = [];
        if(!form){throw new Error("No se encontró el formulario");}
        else {
            let currentCategory = "";
            for (const child of form.children) {
                if(child.tagName === "P"){
                    const category = child.textContent?.trim() || "";
                    if(category !== ""){
                        currentCategory = category;
                    }
                } else if (child.tagName === "TABLE"){
                    child.querySelectorAll("tr").forEach((row) => {
                        row.querySelectorAll("td").forEach((cell,index) => {
                            if(index === 1){
                                let title = row.querySelector("a")?.textContent?.trim() || "";
                                row.querySelector("a")?.remove();
                                let category = currentCategory;
                                const problemCategory = title.match(/(\(OMA\)|\(OMÑ\)|\(OMÑA\))/);
                                if(problemCategory){
                                    category = problemCategory[0] === "(OMA)" ? "OMA" : "Ñandú";
                                    title = title.replace(problemCategory[0],"").trim();
                                }
                                const text = row.querySelector("font")?.textContent || "";
                                let [authorsString,bookData] = text.split(/\r?\n|\r|\n/g);
                                if(!bookData){
                                    bookData = authorsString;
                                    authorsString = "";
                                }
                                const pages = bookData.split(".")[0].match(/\d+/);
                                const price = bookData.split(".")[1].match(/\d+/); 
                                const newBook = {
                                    nombre: title,
                                    categoria: category,
                                    precio: price ? parseInt(price[0]) : 0,
                                    autores: authorsString.split(",").map((author) => author.trim()),
                                    paginas: pages ? parseInt(pages[0]) : 0,
                                }
                                books.push(newBook);
                            }
                        })
                    })
                }
            }
        }
        return books
    })
});