import Image from "next/image";
import type {Book} from "../../app/(public)/otros/libros/libros";
import { useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";

const BooksTable = ({books}:{books:Book[]}) => {
    const categories = books.map(book => book.categoria).filter((value, index, self) => self.indexOf(value) === index);
    let [filter, setFilter] = useState<string[]>([]);
    const [filterMenuOpen, setFilterMenuOpen] = useState(false);
    const filterRef = useOutsideClick(() => setFilterMenuOpen(false));
    return (
        <>
        <div ref={filterRef} className="relative min-h-[50px] mt-6">
            <div className="absolute bg-primary-white border-2 border-solid border-black rounded-xl font-unbounded font-[500] text-[1.6rem] w-1/2 overflow-y-scroll max-h-[300px]">
                <div className={`flex justify-between items-center px-8 py-4 ${filterMenuOpen ? 'border-b-2 border-solid border-black' : ''}`} onClick={() => setFilterMenuOpen(!filterMenuOpen)}>
                    <Image src="/images/filter.svg" alt="" width={30} height={30}/>
                    <span>Filtrar</span>
                    <Image className="" src="/images/menuSelectIcon.svg" alt="" width={20} height={20}/>
                </div>
                {filterMenuOpen && 
                categories.filter((value) => !filter.includes(value)).map((category,idx) => {
                    return(
                        <div onClick={()=> {setFilter([...filter,category]);setFilterMenuOpen(false);}} className="p-4 border-b-2 border-solid border-black last-of-type:border-b-0" key={idx}>{category}</div>
                    )})
                }
            </div>
        </div>
        <div className="mt-6">
            {filter.length > 0 && 
            <div className="flex flex-wrap mt-2">
                {filter.map((category,idx) => {
                    return(
                        <div className="border-2 border-solid border-black bg-primary-light-blue rounded-xl p-4 mr-2 mb-2 flex items-center" key={idx}>
                            <span className="font-unbounded font-[500] text-[1.6rem] mr-6">{category}</span>
                            <Image src="/images/x.svg" alt="" width={16} height={16} onClick={() => setFilter(filter.filter((value) => value !== category))}/>
                        </div>
                    )
                })}
            </div>}
        </div>
        <div className="border-2 border-solid border-black rounded-xl overflow-hidden mt-6 overflow-x-scroll">
            <table className="">
                <thead className="font-unbounded text-[1.6rem] bg-primary-light-blue border-b-2 border-solid border-black">
                    <tr>
                        <th className="w-1/2 p-2">Nombre</th>
                        <th className="w-1/5 p-2">Categoria</th>
                        <th className="p-2">Precio</th>
                        <th className="w-1/5 p-2">Autores</th>
                        <th className="p-2">Páginas</th>
                    </tr>
                </thead>
                <tbody className="font-montserrat text-[1.6rem]">
                {books.filter((book) => filter.length === 0 || filter.includes(book.categoria)).map((book,idx) => {
                    return(
                        <tr className="border-b-2 border-solid border-black last-of-type:border-b-0" key={idx}>
                            <td className="p-2">{book.nombre}</td>
                            <td className="p-2">{book.categoria}</td>
                            <td className="text-right p-2">${book.precio}</td>
                            <td className="p-2">{book.autores.join(", ")}</td>
                            <td className="text-right p-2">{book.paginas}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default BooksTable;
