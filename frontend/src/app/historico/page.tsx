'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import './historico.css'

type Item = {
  produto: {
    nome: string
  }
  quantidade: number
  preco_unitario: number
};

type Pedido = {
  id: number
  data_pedido: string
  cpf_comprador?: string
  total: number
  forma_pagamento: string
  funcionario: {
    nome: string
  }
  itensPedido: Item[]
};

export default function Historico() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
  fetch('http://localhost:3000/historico')
    .then(res => res.json())
    .then(data => {
      console.log('Resposta da API:', data);
      if (Array.isArray(data)) {
        setPedidos(data);
      } else {
        console.error('Formato inválido:', data);
        setPedidos([]);
      }
    })
    .catch(err => {
      console.error('Erro ao buscar pedidos:', err);
      setPedidos([]);
    });
}, []);

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
        <div className="historico-wrapper">
          <div className="historico-header">
            <h2 className="historico-titulo">Histórico de Pedidos</h2>

            <div className="historico-pesquisa">
              <input type="text" placeholder="Pesquisar..." />
              <button>🔍</button>
              <button>⚙️</button>
            </div>
          </div>

          <div className="tabela-historico">
            <table>
              <thead>
                <tr>
                  <th>Funcionário</th>
                  <th>Data</th>
                  <th>CPF do Comprador</th>
                  <th>Total (R$)</th>
                  <th>Forma de Pagamento</th>
                  <th>Itens</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>{pedido.funcionario?.nome || '—'}</td>
                    <td>{new Date(pedido.data_pedido).toLocaleString('pt-BR')}</td>
                    <td>{pedido.cpf_comprador || '—'}</td>
                    <td>{pedido.total.toFixed(2)}</td>
                    <td>{pedido.forma_pagamento}</td>
                    <td>
                      {pedido.itensPedido.map((item, idx) => (
                        <div key={idx}>
                          - {item.produto.nome} ({item.quantidade}x R${item.preco_unitario.toFixed(2)})
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}