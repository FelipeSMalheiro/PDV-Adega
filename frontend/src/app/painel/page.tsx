'use client'

import Image from 'next/image'
import './painel.css'
import { useEffect, useState } from 'react'

type Produto = {
  nome: string
  quantidade: number
}

export default function Painel() {
  const [produtos, setProdutos] = useState<Produto[]>([])

  useEffect(() => {
    const simulados = Array.from({ length: 12 }).map((_, i) => ({
      nome: `Cerveja ${i + 1}`,
      quantidade: Math.floor(Math.random() * 50 + 1),
    }))
    setProdutos(simulados)
  }, [])

  return (
    <div className="painel-container">
      {/* Topo com menu e logo */}
      <header className="painel-header">
        <nav className="painel-menu">
          <button>Produtos</button>
          <button>Funcionários</button>
          <button>Estoque</button>
          <button>Histórico</button>
        </nav>
        <div className="painel-logo">
          <Image src="/logo.png" alt="Logo" width={80} height={80} />
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="painel-conteudo">
        <div className="painel-conteudo-wrapper">
          <section className="produtos-painel">
            <h2 className="produtos-titulo">Produtos Cadastrados</h2>
            <div className="painel-box-scroll">
              <div className="painel-grid">
                {produtos.map((produto, i) => (
                  <div className="card-produto" key={i}>
                    <img src="/cerveja.png" alt={produto.nome} className="img-produto" />
                    <strong>{produto.nome}</strong>
                    <span>Qtd: {produto.quantidade}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Botão fixo no canto inferior direito */}
      <button className="botao-cadastrar">Cadastrar</button>
    </div>
  )
}
