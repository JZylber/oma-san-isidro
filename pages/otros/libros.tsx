import { NextPage } from "next";
import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import styles from "./Libros.module.scss";
import Warning from "../../public/images/warning.svg";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import Image from "next/image";

interface Book{
    nombre : string,
    precio: number,
    descuento: number,
    nuevo: boolean
}

const orderByName = (a: Book, b: Book) => { 
    let a1 = a.nombre
    let b1 = b.nombre
    let a1Words = a1.split(" ")
    let b1Words = b1.split(" ")
    if(a1Words[0] === b1Words[0] && ["(OMA)","(Ñandú)"].includes(a1Words[0])){
        return(Number(a1Words[2])  < Number(b1Words[2]))
    } else{
        return a1.localeCompare(b1);
    }
};

const Books : NextPage = () => {
    const [fetchingBooks,setFetchingBooks] = useState(true);
    const [books,setBooks] = useState<Array<Book>>([])
    const getBooks = async () => {
        try {
            let searchedResults = await fetch(`/api/books?secret=${process.env.API_TOKEN}`).then((response) => response.json());
            setFetchingBooks(false);
            searchedResults.sort(orderByName);
            setBooks(searchedResults);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect( () => {
        getBooks();
    },[])
    const renderBook = (book: Book,idx: number) => {
        return(<tr key={idx}>
            <td className={styles.table_body_bookName}><p className={styles.special}>{book.nuevo?"¡NUEVO!":""}</p><p>{book.nombre}</p></td>
            <td>{`$${book.precio}`}</td>
        </tr>)
    } 

    const table =  
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
            {fetchingBooks? <Loader/> : table}
        </Layout>        
        </>)
}

export default Books