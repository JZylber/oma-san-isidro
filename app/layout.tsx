'use client'

import {Montserrat, Unbounded } from 'next/font/google'
import '../styles/globals.scss';
import { trpc } from '../utils/trpc';


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


const RootLayout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    return (
      <html lang="en" className={`${montserrat.variable} ${unbounded.variable}`}>
        <body>
            <div id="modal-root"></div>
            {children}
        </body>
      </html>
    )
  }

export default trpc.withTRPC(RootLayout);