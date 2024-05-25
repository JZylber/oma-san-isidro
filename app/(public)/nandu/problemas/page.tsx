import { Metadata } from "next";
import NanduProblemsPage from "./problemas";

const metadata : Metadata = {
    title: 'Problemas Ñandú',
    description: 'Problemas pasados de OMA Ñandú',
}

export default function NanduProblems() {
    const problems : Record<string,Record<string,string | string []>> = require("../../../../data/ProblemasNandu.json");
    return(<NanduProblemsPage problems={problems}/>)
}

