import styles from "./Problems.module.scss";
import { Fragment } from "react";

const Problems : ({type}: {type: string}) => JSX.Element = ({type}) => {  
    const problems : {[key: string]: {[key:string]: string}}= require(`../../data/Problemas${type}.json`);
    return(
    <>
        <h1 className={styles.title}>Problemas</h1>
        {Object.keys(problems).map((key:string,idx:number) => {
            const problem = problems[key];
            return(
                <Fragment key={idx}>
                    <h2>{key}</h2>
                    {Object.keys(problem).map((key:string,idx:number) => {
                        const problemLink = problem[key];
                        return(
                            <a href={problemLink} target="_blank" rel="noopener noreferrer" key={idx}>{key}</a>
                        )
                    })}
                </Fragment>
            );
        })}
    </>
    )
}

export default Problems