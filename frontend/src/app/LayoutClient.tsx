'use client'

import { usePathname } from 'next/navigation'
import Cabecalho from './painel/cabecalho'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const mostrarCabecalho = !pathname.startsWith('/login')

  return (
    <>
      {mostrarCabecalho && <Cabecalho />}
      {children}
    </>
  )
}
