import { Metadata } from "next";
import OMAAuth from "./autorizacion";

export const metadata : Metadata = {
    title: 'Autorización OMA',
    description: 'Descarga de la autorización para participar de cada instancia de OMA',
}

export default function OMAAuthorization() {
    return(<OMAAuth/>)
}