import { Metadata } from "next";
import BooksPage from "./libros";

export const metadata: Metadata = {
    title: 'Libros',
    description: 'Los libros a la venta por OMA se consiguen en la tienda online',
}


export default function Libros() {
    return <BooksPage/>
}
