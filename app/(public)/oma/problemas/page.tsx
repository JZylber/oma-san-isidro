import { Metadata } from "next";
import OMAProblemsPage from "./problemas";

const metadata : Metadata = {
    title: 'Problemas OMA',
    description: 'Problemas pasados de OMA',
}

export default function OMAProblems() {
    const problems : Record<string,Record<string,string | string []>> = require("../../../../data/ProblemasOMA.json");
    return(<OMAProblemsPage problems={problems}/>)
}

