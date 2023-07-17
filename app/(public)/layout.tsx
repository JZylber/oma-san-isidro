'use client'
import Layout from '../../components/Layout/Layout';

export default function PublicLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (<Layout>
              {children}
            </Layout>)
  }