import { Metadata } from "next";
import NanduRulesPage from "./reglamento";

export const metadata : Metadata = {
    title: 'Reglamento Ñandú',
    description: 'Reglamento oficial para participar de Ñandú',
}

export default function NanduReglamento() {
    return <NanduRulesPage/>
}