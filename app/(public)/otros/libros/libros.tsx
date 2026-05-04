'use client'
import BooksTable from "../../../../components/Book/BooksTable";
import Loader from "../../../../components/Loader/Loader";
import { trpc } from "../../../../utils/trpc";
import Image from "next/image";

export interface Book{
    nombre : string,
    categoria: string,
    precio: number,
    autores: string[],
    paginas: number,
}

const BooksPage = () => {
    const books = trpc.scraper.getBooks.useQuery();
    if(books.isLoading){
        return(<Loader/>);
    }
    else if(books.isError){
        throw books.error;
    } else if(books.isSuccess){
        return(<RenderBooksPage books={books.data}/>);
    } else {
        return(<h1>Error</h1>);
    }
}

const RenderBooksPage = ({books}:{books:Book[]}) => {
    return(
        <>
            <h1 className="font-unbounded font-semibold max-tablet:text-[3.6rem] max-tablet:[margin-top:8vmin] max-tablet:[margin-bottom:5vmin] tablet:text-[4.8rem] tablet:leading-[2.5]">Libros a la venta</h1>
            <div className="box-border border-2 border-primary-black rounded-[9px] max-tablet:pt-[38px] max-tablet:pb-[34px] max-tablet:px-[16px] tablet:max-desktop:p-[20px] desktop:pt-[calc(200vmin/128)] desktop:pr-[calc(400vw/180)] desktop:pb-[calc(200vw/180)] desktop:pl-[calc(400vw/180)] [&_ul]:list-inside">
                    <div className="flex">
                        <h3 className="font-unbounded font-medium max-tablet:text-[1.82rem] max-tablet:w-full max-tablet:mb-[16px] max-tablet:after:content-[':'] tablet:self-center tablet:text-desktop-actionable">Importante</h3>
                        <div className="relative max-tablet:hidden tablet:w-[71px] tablet:h-[71px]"><Image src="/images/warning.svg" fill={true} alt=""/></div>
                    </div>
                    <div className="font-montserrat font-normal max-tablet:text-mobile-actionable tablet:max-desktop:text-tablet-actionable desktop:text-[2.04rem] [&_p:not(:first-child)]:mt-[.8rem]">
                        <p>Para comprar libros, se deben poner en contacto con cualquiera de las encargadas de venta:</p>
                        <ul>
                            <li>Elena Guillé: <a href="mailto:elena@oma.org.ar">elena@oma.org.ar</a></li>
                            <li>Silvia Chillo: <a href="mailto:silviachillo@gmail.com">silviachillo@gmail.com</a></li>
                        </ul>
                        <p>Proximamente: Estamos trabajando para que se puedan encargar libros desde la página. El pago y la entrega van a seguir estando a cargo de las coordinadoras regionales.</p>
                    </div>
            </div>
            <BooksTable books={books}/>
        </>
    )
}

export default BooksPage