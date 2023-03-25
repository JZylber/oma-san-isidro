import { NextPage } from "next";
import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import styles from "./Libros.module.scss";
import Warning from "../../public/images/warning.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";

interface Book{
    nombre : string,
    precio: number,
    descuento: number,
    nuevo: boolean
}

const Books : NextPage = () => {
    const [fetchingBooks,setFetchingBooks] = useState(true);
    const [books,setBooks] = useState<Array<Book>>([])
    const getBooks = async () => {
        try {
            let searchedResults = await fetch(`/api/books?secret=${process.env.API_TOKEN}`).then((response) => response.json());
            setFetchingBooks(false);
            setBooks(searchedResults);
            console.log(books);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect( () => {
        getBooks();
    },[])
    const renderBook = (book: Book,idx: number) => {
        return(<tr key={idx}>
            <td><p>{book.nuevo?"¡NUEVO!":""}</p><p>{book.nombre}</p></td>
            <td>{`$${book.precio}`}</td>
        </tr>)
    } 

    const table =  
    <div className={styles.table_container}>
        <table className={styles.table}>
            <thead className={styles.table_header}>
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody className={styles.table_body}>
                {books.map(renderBook)}
            </tbody>
        </table>
    </div>
    return(
        <>
        <Head>
            <title>Libros</title>
            <meta   name="description"
                content="Precios e información de los libros a la venta por OMA"></meta>
        </Head>
        <Layout>
            <h1 className={styles.title}>Libros a la venta</h1>
            <div className={styles.warning_box}>
                    <div className={styles.warning_box_title}>
                        <h3>Importante</h3>
                        <Warning className={styles.warning_box_title_icon} />
                    </div>
                    <div className={styles.warning_box_content}>
                        <p>Para comprar libros, se deben poner en contacto con la <Link href={"/contacto"}>coordinadora de su zona</Link>.</p>
                        <p>Proximamente: Estamos trabajando para que se puedan encargar libros desde la página. El pago y la entrega van a seguir estando a cargo de las coordinadoras regionales.</p>
                    </div>
            </div>
            {fetchingBooks? <Loader/> : table}
        </Layout>        
        </>)
}

export default Books