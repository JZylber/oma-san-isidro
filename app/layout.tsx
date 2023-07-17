import {Montserrat, Unbounded } from 'next/font/google'
import '../styles/globals.scss';


const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})
 
const unbounded = Unbounded({
  subsets: ['latin'],
  variable: '--font-unbounded',
  display: 'swap',
})


export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en" className={`${montserrat.variable} ${unbounded.variable}`}>
        <body>
            <div id="modal-root"></div>
            {children}
        </body>
      </html>
    )
  }