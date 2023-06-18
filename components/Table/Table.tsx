import { useState } from "react";
import styles from "./Table.module.scss";
import SelectIcon from "../../public/images/menuSelectIcon.svg";
import {CardType} from "./TableCards/card";

interface TableProps<S extends object>{
    values: Array<S>,
    headers: Array<string>,
    Card: CardType<S>,
    elements_per_page?: number
    download?: boolean
}

const Table = <S extends object,>({values,headers,Card,elements_per_page,download}:TableProps<S>) => {
    const make_element = (result : S,index : number) => {
        return(
            <tr key={index}>
                {Object.values(result).map((cell,sub_index) => <td key={`${index}-${sub_index}`}>{cell}</td>)}
            </tr>)
    }
    //PAGINATION
    const [page,setPage] = useState(0);
    const page_size = elements_per_page?elements_per_page:values.length
    let max_pages =  Math.ceil(values.length / page_size) - 1;
    let firstResult = page * page_size
    let lastResult = Math.min((page + 1)*page_size,values.length)
    const values_in_page = values.slice(firstResult,lastResult)
    const nextPage = () => {
        if(page<max_pages){
            setPage(page + 1);
        }
    }
    const prevPage = () => {
        if(page > 0){
            setPage(page - 1);
        }
    }
    const pagination = 
        <div className={styles.pagination}>
            <p>Mostrando {firstResult + 1}-{lastResult} de {values.length}</p>
            <div className={[styles.prev,page===0 && styles.greyed].join(" ")} onClick={prevPage}><SelectIcon/></div>
            <div className={[styles.next,page===max_pages && styles.greyed].join(" ")} onClick={nextPage}><SelectIcon/></div>
        </div>
    const mobile_pagination = 
        <div className={styles.mobile_pagination}>
            <p>Mostrando {firstResult + 1}-{lastResult} de {values.length}</p>
            <div className={styles.page_select}>
                <div className={[styles.prev,page===0 && styles.greyed].join(" ")} onClick={prevPage}><SelectIcon/></div>
                <div className={styles.pages}>
                    {page >= 2 && <div className={styles.item} onClick={() => setPage(0)}>{1}</div>}
                    {page >= 3 && <div className={styles.item}>...</div>}
                    {page >= 1 && <div className={styles.item} onClick={() => setPage(page - 1)}>{page}</div>}
                    <div className={[styles.item,styles.selected].join(" ")}>{page + 1}</div>
                    {(max_pages - page) >= 1 && <div className={styles.item} onClick={() => setPage(page + 1)}>{page + 2}</div>}
                    {(max_pages - page) >= 3 && <div className={styles.item}>...</div>}
                    {(max_pages - page) >= 2 && <div className={styles.item} onClick={() => setPage(max_pages)}>{max_pages + 1}</div>}
                </div>
                <div className={[styles.next,page===max_pages && styles.greyed].join(" ")} onClick={nextPage}><SelectIcon/></div>
            </div>
        </div>
    const make_table = (values : Array<S>,headers: Array<string>) => {
        return(
            <table className={styles.values_table}>
                <thead>
                    <tr>
                        {headers.map((header,index) => <td key={index}>{header}</td>)}
                    </tr>
                </thead>
                <tbody>
                    {values.map((result,index) => make_element(result,index))}
                </tbody>
            </table>)
    }
    return(
        <>  
            {elements_per_page && mobile_pagination}
            {elements_per_page && <div className={styles["table_header"+(download?"_with_download":"")]}>
                {pagination}
            </div>}
            <div className={styles.values}>
                {make_table(values_in_page,headers)}
            </div>
            <div className={styles.mobile_values}>
                {values_in_page.map((result,idx) => <Card key={idx} value={result}/>)}
            </div>
            {elements_per_page && <div className={styles.table_footer}>
                {pagination}
            </div>}
        </>
    )
}

export default Table