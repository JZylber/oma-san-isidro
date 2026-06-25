import useOutsideClick from "../../hooks/useOutsideClick";

const containerClasses = "absolute [transform:translate(0%,75%)] rounded-[9px] p-[5px] flex gap-x-[5px] z-[100] bg-black after:content-[''] after:absolute after:top-0 after:left-1/2 after:w-0 after:h-0 after:border-[12px] after:border-solid after:border-transparent after:border-b-black after:border-t-[0px] after:-ml-[12px] after:-mt-[12px]";
const linkClasses = "font-montserrat font-normal no-underline text-black bg-primary-white p-[5px] rounded-[9px] transition-all duration-500 flex items-center justify-center w-[30px] h-[30px] max-tablet:text-[1.4rem] max-tablet:leading-[2.4rem] tablet:max-desktop:text-[1.5rem] tablet:max-desktop:leading-[2.4rem] desktop:text-[2rem] desktop:leading-[2.9rem] hover:font-medium hover:text-[x-large] hover:cursor-pointer hover:[text-shadow:-0.25px_-0.25px_0_#000000,0.25px_-0.25px_0_#000000,-0.25px_0.25px_0_#000000,0.25px_0.25px_0_#000000] visited:text-[purple]";

const ProblemLevels : ({problem_links,close}: {problem_links: string [], close: () => void}) => JSX.Element = ({problem_links,close}) => {
    const ref = useOutsideClick(close);
    return(<div className={containerClasses} ref={ref}>
        {problem_links.map((link:string,idx:number) => {
            return(
                <a href={link} target="_blank" rel="noopener noreferrer" key={idx} onClick={close} className={linkClasses}>N{idx + 1}</a>)
        })}
    </div>)
}

export default ProblemLevels;