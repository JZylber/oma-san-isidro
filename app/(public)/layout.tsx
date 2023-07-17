'use client'
import {Montserrat, Unbounded } from 'next/font/google'
import '../../styles/globals.scss';
import Layout from '../../components/Layout/Layout';


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
            <Layout>
              {children}
            </Layout>
        </body>
      </html>
    )
  }