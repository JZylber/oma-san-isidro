import styles from "./Problems.module.scss";
import YearProblems from "./YearProblems";

const Problems : ({type,problems}: {type : string,problems: Record<string,Record<string,string | string []>>}) => JSX.Element = ({type,problems}) => {  
    return(
    <>
        <div className={styles.type}>{type == "OMA"?"Oma":"Ñandú"}</div>
        <h1 className={styles.title}>Problemas</h1>
        <div className="flex flex-col gap-y-4">
        {Object.keys(problems).sort().reverse().map((year:string,idx:number) => {
            const problem = problems[year];
            return(
                <YearProblems key={idx} year={Number(year)} problem_links={problem}/>
            );
        })}
        </div>
    </>
    )
}

export default Problems