import { Metadata } from "next";
import InternationalPage from "./internacional";

export const metadata: Metadata = {
    title: 'Olimpíadas Internacionales',
    description: 'Alumnos de la región que pueden participar en selectivos/competencias internacionales',
}

export default function Internacional() {
    return <InternationalPage/>
}