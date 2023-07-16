'use client'
import Layout from "../../../components/Layout/Layout";
import styles from "./Libros.module.scss";
import Image from "next/image";

export interface Book{
    nombre : string,
    precio: number,
    descuento: number,
    nuevo: boolean
}

const renderBook = (book: Book,idx: number) => {
    return(<tr key={idx}>
        <td className={styles.table_body_bookName}><p className={styles.special}>{book.nuevo?"¡NUEVO!":(book.descuento > 0?"¡OFERTA!":"")}</p><p>{book.nombre}</p></td>
        {book.descuento > 0 ?
            <td>${Math.ceil(book.precio* (1 - book.descuento)/100)*100} <s style={{opacity: "0.5"}}>${book.precio}</s></td>:
            <td>{`$${book.precio}`}</td>}
    </tr>)
} 


const BooksPage = ({books}:{books:Book[]}) => {
    return(
        <Layout>
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
            <div className={styles.table_container}>
                <table className={styles.table}>
                    <thead className={styles.table_header}>
                        <tr>
                            <th className={styles.book_name_column}>Nombre</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody className={styles.table_body}>
                        {books. map(renderBook)}
                    </tbody>
                </table>
            </div>
        </Layout>        
    )
}

export default BooksPage