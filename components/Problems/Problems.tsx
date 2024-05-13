import { useState } from "react";
import styles from "./Problems.module.scss";
import ProblemLevels from "./ProblemByLevels";

const Problems : ({type}: {type: string}) => JSX.Element = ({type}) => {  
    const problems : {[key: string]: {[key:string]: string | string[]}}= require(`../../data/Problemas${type}.json`);
    const [openLevels, setOpenLevels] = useState<{year: string, instance: string} | undefined>(undefined);
    return(
    <>
        <div className={styles.type}>{type == "OMA"?"Oma":"Ñandú"}</div>
        <h1 className={styles.title}>Problemas</h1>
        {Object.keys(problems).sort().reverse().map((year:string,idx:number) => {
            const problem = problems[year];
            return(
                <section className={styles.year_problems} key={idx}>
                    <h2 className={styles.year_number}>{year}</h2>
                    <div className={styles.year_links}>
                    {Object.keys(problem).map((instance:string,idx:number) => {
                        const problemLink = problem[instance];
                        if(problemLink instanceof Array){
                            return(<>
                            <div className={styles.link} key={idx} onClick={() => setOpenLevels({year:year,instance:instance})}>
                                {instance}
                                {openLevels?.year == year && openLevels?.instance == instance && 
                                <ProblemLevels problem_links={problemLink} close={() => setOpenLevels(undefined)}/>}
                            </div>
                            </>)
                        } else{
                        return(
                            <a className={styles.link} href={problemLink} target="_blank" rel="noopener noreferrer" key={idx} onClick={() => setOpenLevels({year:year,instance:instance})}>{instance}</a>
                        )}
                    })}
                    </div>
                </section>
            );
        })}
    </>
    )
}

export default Problems