import { Metadata } from "next";
import KangarooPage from "./canguro";

export const metadata: Metadata = {
    title: 'Canguro',
    description: 'Información general de canguro matemático',
}

export default function Canguro() {
    return <KangarooPage/>
}