import styles from "./ProblemLevels.module.scss";

const ProblemLevels : ({problem_links,close}: {problem_links: string [], close: () => void}) => JSX.Element = ({problem_links,close}) => {
    return(<div className={styles.container} >
        {problem_links.map((link:string,idx:number) => {
            return(
                <a href={link} target = "_blank" rel="noopener noreferrer" key={idx} onClick={close}>{idx + 1}</a>)
        })}
    </div>)
}

export default ProblemLevels;