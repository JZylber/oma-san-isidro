import { Metadata } from "next";
import BooksPage from "./libros";

export const metadata: Metadata = {
    title: 'Libros',
    description: 'Precios e información de los libros a la venta por OMA',
}


export default async function Libros() {
    return <BooksPage/>
}