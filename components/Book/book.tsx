import type {Book} from "../../app/(public)/otros/libros/libros";

const BookCard = (book: Book) => {
    return (
        <div className="flex flex-col border-2 border-black p-4 rounded-xl">
            <h1 className="font-unbounded text-[2rem] text-center">{book.nombre}</h1>
            <div className="font-montserrat text-[1.6rem]">
                <span>Categoria: {book.categoria}</span>
            </div>
            <div className="font-montserrat text-[1.4rem]">
                <span>Autores: </span><span>{book.autores.join(", ")}</span>
            </div>
            <div className="font-montserrat text-[1.4rem]">
                <span>Precio: </span><span>${book.precio}</span>
            </div>
            <div className="font-montserrat text-[1.4rem]">
                <span>{book.paginas} páginas</span>
            </div>
        </div>
    );
}

export default BookCard;
