import { useRouter } from "next/router"

type ResultProps = {
    competition : string
}

const Results = ({competition} : ResultProps) => {
    const router = useRouter()
    return(
        <>
        <h1>Resultados {competition}</h1>
        <form>
        </form>
        </>
    )
}

export default Results