'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import './estoque.css'

interface Produto {
  id: number
  nome: string
  descricao?: string
  preco: number
  estoque: number
  quantidade: number
  unidade_medida: string
  ativo: boolean
  id_categoria: number
  precoFormatado?: string
}

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [form, setForm] = useState<Partial<Produto>>({ ativo: true })
  const [modalAberto, setModalAberto] = useState(false)
  const [modoEdicao, setModoEdicao] = useState(false)
  const [toast, setToast] = useState<{ msg: string; tipo: string } | null>(null)

  useEffect(() => {
    buscarProdutos()
  }, [])

  const buscarProdutos = async () => {
    try {
      const res = await fetch('http://localhost:3000/produtos')
      const data = await res.json()
      setProdutos(data)
    } catch (err) {
      console.error(err)
    }
  }

  const abrirModal = (produto?: Produto) => {
    setModoEdicao(!!produto)
    setForm(produto ? {
      ...produto,
      precoFormatado: produto.preco.toFixed(2).replace('.', ',')
    } : { ativo: true })
    setModalAberto(true)
  }

  const fecharModal = () => {
    setForm({})
    setModalAberto(false)
    setModoEdicao(false)
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target

    if (name === 'preco') {
      const somenteNumeros = value.replace(/[^\d]/g, '')
      const comVirgula = (Number(somenteNumeros) / 100).toFixed(2).replace('.', ',')
      setForm({
        ...form,
        preco: Number(somenteNumeros) / 100,
        precoFormatado: comVirgula
      })
    } else if (["estoque", "quantidade", "id_categoria"].includes(name)) {
      setForm({ ...form, [name]: Number(value) })
    } else if (name === 'ativo') {
      setForm({ ...form, ativo: value === 'true' })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const salvar = async () => {
    if (!form.nome || !form.estoque || !form.preco || !form.unidade_medida || !form.quantidade || !form.id_categoria) {
      mostrarToast('Preencha todos os campos obrigatórios.', 'erro')
      return
    }

    try {
      const url = modoEdicao
        ? `http://localhost:3000/produtos/${form.id}`
        : 'http://localhost:3000/produtos'
      const metodo = modoEdicao ? 'PUT' : 'POST'

      const { precoFormatado, ...dadosLimpos } = form

      const res = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosLimpos),
      })

      if (!res.ok) throw new Error(await res.text())

      mostrarToast(modoEdicao ? 'Produto alterado com sucesso!' : 'Produto cadastrado!')
      buscarProdutos()
      fecharModal()
    } catch (err: any) {
      mostrarToast(err.message || 'Erro ao salvar.', 'erro')
    }
  }

  const excluir = async (id: number) => {
    if (!confirm('Deseja realmente excluir este produto?')) return
    try {
      await fetch(`http://localhost:3000/produtos/${id}`, { method: 'DELETE' })
      mostrarToast('Produto excluído!')
      buscarProdutos()
    } catch (err) {
      mostrarToast('Erro ao excluir.', 'erro')
    }
  }

  const mostrarToast = (msg: string, tipo = 'sucesso') => {
    setToast({ msg, tipo })
    setTimeout(() => setToast(null), 3000)
  }

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
          <h2 className="estoque-titulo">Lista de Produtos</h2>

          <div className="tabela-estoque">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Preço</th>
                  <th>Estoque</th>
                  <th>Quantidade</th>
                  <th>Unidade</th>
                  <th>Ativo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((p) => (
                  <tr key={p.id}>
                    <td>{p.nome}</td>
                    <td>{p.descricao}</td>
                    <td>{p.preco.toFixed(2)}</td>
                    <td>{p.estoque}</td>
                    <td>{p.quantidade}</td>
                    <td>{p.unidade_medida}</td>
                    <td>{p.ativo ? 'Sim' : 'Não'}</td>
                    <td>
                      <button className="btn-estoque btn-editar" onClick={() => abrirModal(p)}>
                        Editar
                      </button>
                      <button className="btn-estoque btn-excluir" onClick={() => excluir(p.id)}>
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className="botao-cadastrar-cerveja" onClick={() => abrirModal()}>
            Cadastrar Produto
          </button>
        </div>
      </main>

      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{modoEdicao ? 'Editar Produto' : 'Novo Produto'}</h3>

            <input name="nome" placeholder="Nome" value={form.nome || ''} onChange={handleChange} />
            <input
              name="descricao"
              placeholder="Descrição"
              value={form.descricao || ''}
              onChange={handleChange}
            />
            <input
              name="preco"
              placeholder="Preço (ex: 9,99)"
              value={form.precoFormatado || ''}
              onChange={handleChange}
            />
            <input
              name="estoque"
              type="number"
              placeholder="Estoque"
              value={form.estoque || ''}
              onChange={handleChange}
            />
            <input
              name="quantidade"
              type="number"
              placeholder="Quantidade (ml, kg, etc)"
              value={form.quantidade || ''}
              onChange={handleChange}
            />
            <input
              name="unidade_medida"
              placeholder="Unidade de medida (ml, kg...)"
              value={form.unidade_medida || ''}
              onChange={handleChange}
            />
            <input
              name="id_categoria"
              type="number"
              placeholder="ID da categoria"
              value={form.id_categoria || ''}
              onChange={handleChange}
            />
            <select name="ativo" value={form.ativo?.toString()} onChange={handleChange}>
              <option value="true">Ativo</option>
              <option value="false">Inativo</option>
            </select>

            <div className="modal-actions">
              <button onClick={salvar}>{modoEdicao ? 'Salvar' : 'Cadastrar'}</button>
              <button onClick={fecharModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={`toast ${toast.tipo}`}>
          {toast.msg}
        </div>
      )}
    </div>
  )
}
