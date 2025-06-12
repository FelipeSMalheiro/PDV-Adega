'use client'

import './globals.css'
import './painel/painel.css'
import Cabecalho from './painel/cabecalho'
import BotaoSair from '../components/BotaoSair'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const mostrarCabecalho = pathname !== '/login'

  return (
    <html lang="pt-BR">
      <body>
        {mostrarCabecalho && <Cabecalho />}
        {mostrarCabecalho && <BotaoSair />}
        {children}
      </body>
    </html>
  )
}
