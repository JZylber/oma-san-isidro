import { NextPage } from "next";
import NavBar from "../../components/NavBar/Navbar";
import Results from "../../components/ResultsPage/results";

const OMAResults : NextPage = () => {
    return(
        <>
        <NavBar/>
        <Results competition="OMA"/>
        </>
        )
}

export default OMAResults