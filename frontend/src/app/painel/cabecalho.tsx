'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Cabecalho() {
  return (
    <header className="painel-header">
      <nav className="painel-menu">
        <Link href="/painel"><button>Pedidos</button></Link>
        <Link href="/funcionarios"><button>Funcionários</button></Link>
        <Link href="/estoque"><button>Estoque</button></Link>
        <Link href="/historico"><button>Histórico</button></Link>
      </nav>

      <div className="painel-logo">
        <Image src="/logo.png" alt="Logo" width={60} height={60} />
      </div>
    </header>
  )
}
