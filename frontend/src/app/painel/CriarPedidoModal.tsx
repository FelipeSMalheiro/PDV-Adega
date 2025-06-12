'use client'

import { ReactNode, useEffect, useState } from 'react'

type Produto = {
  unidade_medida: ReactNode
  quantidade: ReactNode
  id: number
  nome: string
  preco: number
  estoque: number
}

type ItemPedido = {
  id_produto: number
  quantidade: number
}

type Props = {
  aberto: boolean
  onFechar: () => void
  onSalvo: () => void
}

export default function CriarPedidoModal({ aberto, onFechar, onSalvo }: Props) {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [itens, setItens] = useState<ItemPedido[]>([])
  const [filtro, setFiltro] = useState('')
  const [cpfComprador, setCpfComprador] = useState('')
  const [formaPagamento, setFormaPagamento] = useState('')

  useEffect(() => {
    if (aberto) {
      fetch('http://localhost:3000/produtos')
        .then((res) => res.json())
        .then(setProdutos)
        .catch(console.error)
    }
  }, [aberto])

  const adicionarItem = (id_produto: number) => {
    const existente = itens.find((i) => i.id_produto === id_produto)
    if (existente) {
      setItens(itens.map((i) =>
        i.id_produto === id_produto
          ? { ...i, quantidade: i.quantidade + 1 }
          : i
      ))
    } else {
      setItens([...itens, { id_produto, quantidade: 1 }])
    }
  }

  const removerItem = (id_produto: number) => {
    setItens(itens.filter((i) => i.id_produto !== id_produto))
  }

  const salvarPedido = async () => {
    const id_funcionario = parseInt(localStorage.getItem('id_funcionario') || '0')
    if (!id_funcionario || itens.length === 0 || !formaPagamento) {
      alert('Preencha todos os campos obrigatórios.')
      return
    }

    const pedido = {
      id_funcionario,
      cpf_comprador: cpfComprador,
      forma_pagamento: formaPagamento,
      itens
    }

    try {
      const res = await fetch('http://localhost:3000/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido)
      })

      if (!res.ok) throw new Error(await res.text())

      alert('Pedido criado com sucesso!')
      onSalvo()
      onFechar()
    } catch (err) {
      alert('Erro ao salvar pedido: ' + err)
    }
  }

  if (!aberto) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Novo Pedido</h3>

        <input
          type="text"
          placeholder="Buscar produto pelo nome"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
        />

        <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '1rem' }}>
  {filtro && produtos
    .filter((p) => p.nome.toLowerCase().includes(filtro.toLowerCase()))
    .map((p) => (
      <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <span>
  <strong>{p.nome}</strong> {p.quantidade} {p.unidade_medida} — {p.estoque} unidades em estoque
</span>

        <button onClick={() => adicionarItem(p.id)} style={{ marginLeft: 10 }}>
          Adicionar
        </button>
      </div>
    ))}
</div>


        <h4>Itens do Pedido</h4>
        <ul>
          {itens.map((item) => {
            const produto = produtos.find((p) => p.id === item.id_produto)
            return (
              <li key={item.id_produto}>
                {produto?.nome} - Quantidade: {item.quantidade}
                <button onClick={() => removerItem(item.id_produto)} style={{ marginLeft: 10 }}>
                  Remover
                </button>
              </li>
            )
          })}
        </ul>

        <input
          placeholder="CPF do comprador (opcional)"
          value={cpfComprador}
          onChange={(e) => setCpfComprador(e.target.value)}
          style={{ width: '100%', marginTop: 12, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
        />

        <input
          placeholder="Forma de Pagamento (ex: dinheiro, cartão)"
          value={formaPagamento}
          onChange={(e) => setFormaPagamento(e.target.value)}
          style={{ width: '100%', marginTop: 10, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
        />

        <div className="modal-actions">
          <button onClick={salvarPedido}>Confirmar Pedido</button>
          <button onClick={onFechar}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
