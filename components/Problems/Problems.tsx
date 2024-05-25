import styles from "./Problems.module.scss";
import YearProblems from "./YearProblems";

const Problems : ({type}: {type: string}) => JSX.Element = ({type}) => {  
    const problems : {[key: string]: {[key:string]: string | string[]}}= require(`../../data/Problemas${type}.json`);
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