import { Metadata } from "next";
import BooksPage, { Book } from "./libros";

export const metadata: Metadata = {
    title: 'Libros',
    description: 'Precios e información de los libros a la venta por OMA',
}

const orderByName = (a: Book, b: Book) => { 
    let a1 = a.nombre
    let b1 = b.nombre
    let a1Words = a1.split(" ")
    let b1Words = b1.split(" ")
    if(a1Words[0] === b1Words[0] && ["(OMA)","(Ñandú)"].includes(a1Words[0])){
        return a1Words[1].localeCompare(b1Words[1])
    } else{
        return a1.localeCompare(b1);
    }
};

export default async function Libros() {
    const query = await prisma.libro.findMany(
        {
            select:{
                nombre:true,
                precio:true,
                descuento:true,
                nuevo:true
            }
        }
    );
    let books = query?query:[];
    books.sort(orderByName);
    return <BooksPage books={books}/>
}