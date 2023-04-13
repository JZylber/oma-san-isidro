import styles from "./Problems.module.scss";

const Problems : ({type}: {type: string}) => JSX.Element = ({type}) => {  
    const problems : {[key: string]: {[key:string]: string}}= require(`../../data/Problemas${type}.json`);
    return(
    <>
        <div className={styles.type}>{type == "OMA"?"Oma":"Ñandú"}</div>
        <h1 className={styles.title}>Problemas</h1>
        {Object.keys(problems).sort().reverse().map((key:string,idx:number) => {
            const problem = problems[key];
            return(
                <section className={styles.year_problems} key={idx}>
                    <h2 className={styles.year_number}>{key}</h2>
                    <div className={styles.year_links}>
                    {Object.keys(problem).map((key:string,idx:number) => {
                        const problemLink = problem[key];
                        return(
                            <a className={styles.link} href={problemLink} target="_blank" rel="noopener noreferrer" key={idx}>{key}</a>
                        )
                    })}
                    </div>
                </section>
            );
        })}
    </>
    )
}

export default Problems