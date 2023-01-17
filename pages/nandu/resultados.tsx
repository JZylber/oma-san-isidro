import { NextPage } from "next";
import NavBar from "../../components/NavBar/Navbar";
import Results from "../../components/ResultsPage/results";

const NanduResults : NextPage = () => {
    return(
        <>
        <NavBar/>
        <Results competition="Ñandú"/>
        </>
        )
}

export default NanduResults