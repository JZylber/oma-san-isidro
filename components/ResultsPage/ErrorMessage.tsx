import Image from "next/image";

interface ErrorMessageText{
    title: string,
    paragraphs: string[]
}

const ErrorTexts : {[key: number]: ErrorMessageText} = {
    400:{   title: "La consulta no arrojó ningún resultado",
            paragraphs: ["No hay resultados para los filtros seleccionados.", "Cambie los filtros e intente nuevamente."]
        },
    503:{   title: "Error de conexión",
            paragraphs: ["No se pudo establecer una conexión con el servidor.", "Intente nuevamente más tarde."]},
    600:{   title: "Error inesperado",
            paragraphs: ["Ha ocurrido un error inesperado.", "Intente nuevamente más tarde."]}
}

const ErrorMessage = ({status = 600}:{status?: number}) => {
    const {title,paragraphs} = ErrorTexts[status]
    return(
        <div className="flex border-2 border-primary-black rounded-[9px] p-[1.6rem] max-tablet:flex-col max-tablet:items-center">
            <div className="flex justify-center items-center">
                <Image src="/images/warning.svg" width={71} height={71} alt="" />
            </div>
            <div className="p-[1.6rem] flex flex-col">
                <p className="font-unbounded font-medium pb-[1.2rem] max-tablet:text-[2rem] tablet:max-desktop:text-[2.2rem] desktop:text-[3.4rem] desktop:after:content-['_:(']">{title}</p>
                <span className="tablet:flex tablet:flex-col">
                    {paragraphs.map((paragraph,index) => <span key={index} className="font-montserrat font-normal max-tablet:text-mobile-reading max-tablet:inline tablet:text-desktop-reading max-tablet:before:content-['_'] max-tablet:first:before:content-none">{paragraph}</span>)}
                </span>
            </div>
        </div>
    )
}

export default ErrorMessage