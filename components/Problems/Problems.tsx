import YearProblems from "./YearProblems";

const typeClasses = "max-tablet:block max-tablet:font-unbounded max-tablet:font-normal max-tablet:text-[2.1rem] max-tablet:mt-[1.6rem] tablet:hidden";
const titleClasses = "font-unbounded font-semibold max-tablet:text-[3.6rem] max-tablet:mt-[calc(4*100vmin/50)] max-tablet:mb-[calc(2.5*100vmin/50)] tablet:text-[4.8rem] tablet:leading-[2.5]";

const Problems : ({type,problems}: {type : string,problems: Record<string,Record<string,string | string []>>}) => JSX.Element = ({type,problems}) => {
    return(
    <>
        <div className={typeClasses}>{type == "OMA"?"Oma":"Ñandú"}</div>
        <h1 className={titleClasses}>Problemas</h1>
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