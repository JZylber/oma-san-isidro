'use client'
import Problems from "../../../../components/Problems/Problems";

const OMAProblemsPage = ({problems} : {problems : Record<string,Record<string,string | string []>>}) => {
    return(<Problems type="OMA" problems={problems}/>)
}

export default OMAProblemsPage