import Image from "next/image";
import { useState } from "react";

const YearProblems : ({year,problem_links}: {year:number,problem_links: Record<string,string | string []>}) => JSX.Element = ({year,problem_links}) => {
    const [open,setOpen] = useState(false);
    return(
        <div className="flex gap-x-4 cursor-pointer" onClick={() => setOpen(!open)}>
            <span className="font-unbounded font-[500] text-[2.4rem] w-40">{year}</span><Image src="/images/menuArrow.svg" alt="arrow" width={14} height={14} className={`${open?"rotate-90":""} transition-transform`}/>
        </div>
    )
}

export default YearProblems;