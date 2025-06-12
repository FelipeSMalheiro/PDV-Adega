'use client'

import Image from 'next/image'
import './painel.css'
import { useEffect, useState } from 'react'
import CriarPedidoModal from './CriarPedidoModal'

type Produto = {
  id: number
  nome: string
  estoque: number
  quantidade: number
  unidade_medida: string
}

export default function Painel() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [modalAberto, setModalAberto] = useState(false)

  const buscarProdutos = () => {
    fetch('http://localhost:3000/produtos')
      .then((res) => res.json())
      .then(setProdutos)
      .catch((err) => console.error('Erro:', err))
  }

  useEffect(() => {
    buscarProdutos()
  }, [])

  return (
    <div className="painel-container">
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

      <main className="painel-conteudo">
        <div className="painel-conteudo-wrapper">
          <section className="produtos-painel">
            <h2 className="produtos-titulo">Produtos Cadastrados</h2>
            <div className="painel-box-scroll">
              <div className="painel-grid">
                {produtos.map((produto) => (
                  <div className="card-produto" key={produto.id}>
                    <img src="/cerveja.png" alt={produto.nome} className="img-produto" />
                    <strong>{produto.nome}</strong>
                    <span>{produto.quantidade} {produto.unidade_medida}</span>
                    <span>{produto.estoque} unidades em estoque</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <button className="botao-cadastrar" onClick={() => setModalAberto(true)}>
        Novo Pedido
      </button>

      <CriarPedidoModal
        aberto={modalAberto}
        onFechar={() => setModalAberto(false)}
        onSalvo={buscarProdutos}
      />
    </div>
  )
}

