import { Metadata } from "next";
import OMARulesPage from "./reglamento";

export const metadata : Metadata = {
    title: 'Reglamento OMA',
    description: 'Reglamento oficial para participar de OMA',
}

export default function OMAReglamento() {
    return <OMARulesPage/>
}