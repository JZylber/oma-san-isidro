import { Metadata } from 'next'
import ContactPage from './contact-page'
 
export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Información de contacto de OMA/Ñandú para las distintas localidades de la región',
}

export default function Contact() {
    return(<ContactPage/>)
}