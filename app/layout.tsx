'use client'
import '../styles/globals.scss';
import { trpc } from '../utils/trpc';

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <html lang="en">
      <body>
          <div id="modal-root"></div>
          {children}
      </body>
    </html>
  )
}

export default trpc.withTRPC(RootLayout);