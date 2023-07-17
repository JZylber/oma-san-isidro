import { Metadata } from "next";
import NanduAuth from "./autorizacion";

export const metadata : Metadata = {
    title: 'Autorización Ñandú',
    description: 'Descarga de la autorización para participar de cada instancia de Ñandú',
}

export default function NanduAuthorization() {
    return(<NanduAuth/>)
}