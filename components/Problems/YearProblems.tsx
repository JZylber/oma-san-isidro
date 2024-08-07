import Image from "next/image";
import { useState } from "react";

const InstanceProblems : ({instance,problem_links}: {instance:string,problem_links: string []}) => JSX.Element = ({instance,problem_links}) => {
    const [open,setOpen] = useState(false);
    return(
        <div className="flex flex-col gap-y-4">
            <div className="flex gap-x-4 cursor-pointer" onClick={() => setOpen(!open)}>
                <Image src="/images/menuArrow.svg" alt="arrow" width={10} height={10} className={`${open?"rotate-90":""} transition-transform`}/>
                <span className="font-unbounded font-[400] text-[1.6rem] w-60">{instance}</span>
            </div>
            <div className={`flex flex-col gap-y-4 pl-12 ${open?"scale-y-100":"scale-y-0 h-0"} overflow-hidden transition-transform`}>
                {problem_links.map((problem:string,idx:number) => {
                    return(
                        <a key={idx} href={problem} target="_blank" rel="noreferrer" className="cursor-pointer">
                            <span className="font-unbounded font-[400] text-[1.6rem]">Nivel {idx + 1}</span>
                        </a>
                    );
                })}
                </div>
        </div>
    )
}

const YearProblems : ({year,problem_links}: {year:number,problem_links: Record<string,string | string []>}) => JSX.Element = ({year,problem_links}) => {
    const [open,setOpen] = useState(false);
    return(
        <div className="flex flex-col">
            <div className="flex gap-x-6 cursor-pointer" onClick={() => setOpen(!open)}>
                <Image src="/images/menuArrow.svg" alt="arrow" width={12} height={12} className={`${open?"rotate-90":""} transition-transform`}/>
                <span className="font-unbounded font-[500] text-[2.4rem] w-40">{year}</span>
            </div>
            <div className={`flex flex-col gap-y-4 pl-12 ${open?"scale-y-100":"scale-y-0 h-0"} overflow-hidden transition-transform`}>
                {Object.keys(problem_links).map((problem:string,idx:number) => {
                    const link = problem_links[problem];
                    if(typeof link === "string"){
                        return(
                            <a key={idx} href={link as string} target="_blank" rel="noreferrer" className="cursor-pointer">
                                <span className="font-unbounded font-[400] text-[1.6rem]">{problem}</span>
                            </a>
                        );
                    } else{
                        return(
                            <InstanceProblems key={idx} instance={problem} problem_links={link as string[]}/>
                        );
                    }
                })}
                </div>
        </div>
    )
}

export default YearProblems;