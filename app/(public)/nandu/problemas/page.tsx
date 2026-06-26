import { Metadata } from "next";
import NanduProblemsPage from "./problemas";

export const metadata: Metadata = {
    title: 'Problemas Ñandú',
    description: 'Problemas pasados de OMA Ñandú',
}

export default function NanduProblems() {
    return(<NanduProblemsPage/>)
}
