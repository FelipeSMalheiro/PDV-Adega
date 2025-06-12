import './globals.css'
import './painel/painel.css'
import LayoutClient from './LayoutClient'

export const metadata = {
  title: 'Smart Malte',
  description: 'Sistema para Controle de Vendas',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  )
}
