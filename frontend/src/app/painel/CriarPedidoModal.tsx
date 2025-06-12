'use client'

import { useEffect, useState } from 'react'
import './modal.css'

type Produto = {
  id: number
  nome: string
  preco: number
  estoque: number
  quantidade: number
  unidade_medida: string
  imagem_url?: string
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
  const [quantidades, setQuantidades] = useState<{ [id: number]: number }>({})

  useEffect(() => {
    if (aberto) {
      fetch('http://localhost:3000/produtos')
        .then((res) => res.json())
        .then(setProdutos)
        .catch(console.error)
    }
  }, [aberto])

  const adicionarItem = (id_produto: number) => {
    const produto = produtos.find(p => p.id === id_produto)
    const quantidade = quantidades[id_produto] || 0

    if (!produto) return
    if (quantidade <= 0) {
      alert('Informe uma quantidade válida.')
      return
    }
    if (quantidade > produto.estoque) {
      alert(`Quantidade excede o estoque disponível (${produto.estoque})`)
      return
    }

    const existente = itens.find(i => i.id_produto === id_produto)
    if (existente) {
      setItens(itens.map(i =>
        i.id_produto === id_produto
          ? { ...i, quantidade: i.quantidade + quantidade }
          : i
      ))
    } else {
      setItens([...itens, { id_produto, quantidade }])
    }

    setQuantidades({ ...quantidades, [id_produto]: 0 })
  }

  const removerItem = (id_produto: number) => {
    setItens(itens.filter((i) => i.id_produto !== id_produto))
  }

  const salvarPedido = async () => {
    const id_funcionario = Number(localStorage.getItem('id_funcionario'))

    if (!id_funcionario || isNaN(id_funcionario)) {
      alert('Funcionário não autenticado. Faça login novamente.')
      return
    }

    if (itens.length === 0 || !formaPagamento.trim()) {
      alert('Preencha todos os campos obrigatórios.')
      return
    }

    const pedido = {
      id_funcionario,
      cpf_comprador: cpfComprador || undefined,
      forma_pagamento: formaPagamento,
      itens,
    }

    try {
      const res = await fetch('http://localhost:3000/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido),
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
              <div key={p.id} className="produto-linha">
                <img
                  src={p.imagem_url || '/cerveja.png'}
                  alt={p.nome}
                  className="img-produto"
                  style={{ width: 40, height: 40, objectFit: 'contain', marginRight: 10 }}
                />
                <div className="produto-info">
                  <strong>{p.nome}</strong> {p.quantidade} {p.unidade_medida} — {p.estoque} em estoque
                </div>
                <input
                  type="number"
                  min={1}
                  max={p.estoque}
                  className="produto-quantidade"
                  value={quantidades[p.id] || ''}
                  onChange={(e) =>
                    setQuantidades({
                      ...quantidades,
                      [p.id]: parseInt(e.target.value) || 0
                    })
                  }
                />
                <button className="produto-adicionar" onClick={() => adicionarItem(p.id)}>
                  Adicionar
                </button>
              </div>
            ))}
        </div>

        <h4>Itens do Pedido</h4>
        <table className="tabela-itens">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {itens.map((item) => {
              const produto = produtos.find((p) => p.id === item.id_produto)
              return (
                <tr key={item.id_produto}>
                  <td>{produto?.nome}</td>
                  <td style={{ textAlign: 'center' }}>{item.quantidade}</td>
                  <td>
                    <button
                      className="produto-remover"
                      onClick={() => removerItem(item.id_produto)}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <input
          placeholder="CPF do comprador (opcional)"
          value={cpfComprador}
          onChange={(e) => setCpfComprador(e.target.value)}
        />

        <input
          placeholder="Forma de Pagamento (ex: dinheiro, cartão)"
          value={formaPagamento}
          onChange={(e) => setFormaPagamento(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={salvarPedido}>Confirmar Pedido</button>
          <button onClick={onFechar}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}





