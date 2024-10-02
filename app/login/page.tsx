import { Metadata } from "next";
import LoginPage from "./login";

export const metadata : Metadata = {
    title: 'Login',
    description: 'Ingreso a la web de OMA San Isidro',
}

export default function OMALogin() {
    return(<LoginPage/>)
}