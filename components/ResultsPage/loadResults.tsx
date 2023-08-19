import { trpc } from "../../utils/trpc";
import Loader from "../Loader/Loader";
import ErrorMessage from "./ErrorMessage";
import ProvincialResultTable from "./ProvincialTable";
import ResultTable from "./ResultTable";
import { TestInfo } from "./resultsTypes";

const LoadResults = (props:TestInfo) => {
    const results = trpc.results.getResults.useQuery(props);
    if(results.isLoading){
        return <Loader/>
    }
    else if(results.isError){
        return(<ErrorMessage status={results.error.data?.httpStatus}/>)
    } else if(results.isSuccess) {
        if(results.data.length > 0){
            if(props.instancia === "PROVINCIAL"){
                return(<ProvincialResultTable results={results.data} testInfo={props}/>)
            }
            else{
                return(<ResultTable results={results.data} testInfo={props}/>);
            }
        } else {
            return(<ErrorMessage status={400}/>)
        }
    }else{
        return(<ErrorMessage status={400}/>)
    }
}
export default LoadResults;