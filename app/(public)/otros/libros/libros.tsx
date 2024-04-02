'use client'
import { Button } from "../../../../components/buttons/Button";
import { trpc } from "../../../../utils/trpc";
import styles from "./Libros.module.scss";
import Image from "next/image";

export interface Book{
    nombre : string,
    categoria: string,
    precio: number,
    autores: string[],
    páginas: number,
}

const BooksPage = () => {
    const books = trpc.scraper.getBooks.useQuery();
    if(books.isLoading){
        return(<div>Cargando...</div>)
    }
    else if(books.isError){
        return(<div>Error</div>)
    } else if(books.isSuccess){
        return(<RenderBooksPage books={books.data}/>)
    }
}

const RenderBooksPage = ({books}:{books:Book[]}) => {
    return(
        <>
            <h1 className={styles.title}>Libros a la venta</h1>
            <div className={styles.warning_box}>
                    <div className={styles.warning_box_title}>
                        <h3>Importante</h3>
                        <div className={styles.warning_box_title_icon}><Image src="/images/warning.svg" fill={true} alt=""/></div>
                    </div>
                    <div className={styles.warning_box_content}>
                        <p>Para comprar libros, se deben poner en contacto con cualquiera de las encargadas de venta:</p>
                        <ul>
                            <li>Elena Guillé: <a href="mailto:elena@oma.org.ar">elena@oma.org.ar</a></li>
                            <li>Silvia Chillo: <a href="mailto:silviachillo@gmail.com">silviachillo@gmail.com</a></li>
                        </ul>
                        <p>Proximamente: Estamos trabajando para que se puedan encargar libros desde la página. El pago y la entrega van a seguir estando a cargo de las coordinadoras regionales.</p>
                    </div>
            </div>
        </>
    )
}

export default BooksPage