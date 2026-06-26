import { Metadata } from "next";
import OMAProblemsPage from "./problemas";

export const metadata: Metadata = {
    title: 'Problemas OMA',
    description: 'Problemas pasados de OMA',
}

export default function OMAProblems() {
    return(<OMAProblemsPage/>)
}
