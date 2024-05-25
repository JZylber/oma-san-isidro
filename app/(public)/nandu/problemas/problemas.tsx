'use client'
import Problems from "../../../../components/Problems/Problems";

const NanduProblemsPage = ({problems} : {problems: Record<string,Record<string,string | string []>>}) => {
    return(<Problems type="Nandu" problems={problems}/>)
}

export default NanduProblemsPage