'use client'

import Image from 'next/image'
import './funcionarios.css'
import { useEffect, useState } from 'react'

type Funcionario = {
  id: number
  nome: string
  cargo: string
  ativo: boolean
}

const formatarCPF = (cpf: string) => {
  const numeros = cpf.replace(/\D/g, '').slice(0, 11)

  if (numeros.length <= 3) {
    return numeros
  } else if (numeros.length <= 6) {
    return `${numeros.slice(0, 3)}.${numeros.slice(3)}`
  } else if (numeros.length <= 9) {
    return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6)}`
  } else {
    return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6, 9)}-${numeros.slice(9)}`
  }
}

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    senha: '',
    cargo: '',
    ativo: true,
  })
  const [mensagem, setMensagem] = useState('')
  const [editando, setEditando] = useState<Funcionario | null>(null)

  useEffect(() => {
    fetchFuncionarios()
  }, [])

  const fetchFuncionarios = () => {
    fetch('http://localhost:3000/funcionarios')
      .then((res) => res.json())
      .then((data) => setFuncionarios(data))
      .catch((err) => console.error('Erro ao buscar funcionários:', err))
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este funcionário?')) return
    await fetch(`http://localhost:3000/funcionarios/${id}`, { method: 'DELETE' })
    fetchFuncionarios()
    setMensagem('Funcionário excluído com sucesso!')
    setTimeout(() => setMensagem(''), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === 'ativo') {
      setForm({ ...form, ativo: value === 'true' })
    } else if (name === 'cpf') {
      const numeros = value.replace(/\D/g, '')
      if (numeros.length <= 11) {
        setForm({ ...form, cpf: formatarCPF(numeros) })
      }
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMensagem('')

    const metodo = editando ? 'PUT' : 'POST'
    const url = editando
      ? `http://localhost:3000/funcionarios/${editando.id}`
      : 'http://localhost:3000/funcionarios'

    try {
      const res = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const erro = await res.text()
        throw new Error(erro || 'Erro ao salvar funcionário')
      }

      setMensagem(editando ? 'Funcionário atualizado com sucesso!' : 'Funcionário cadastrado com sucesso!')
      setForm({ nome: '', cpf: '', senha: '', cargo: '', ativo: true })
      setEditando(null)
      setShowModal(false)
      fetchFuncionarios()
      setTimeout(() => setMensagem(''), 3000)
    } catch (err: any) {
      setMensagem(`Erro: ${err.message}`)
      setTimeout(() => setMensagem(''), 3000)
    }
  }

  return (
    <div className="painel-container">
      <main className="painel-conteudo">
        <div className="painel-conteudo-wrapper">
          <section className="secao-funcionarios">
            <h2 className="produtos-titulo">Cadastro de Funcionários</h2>

            <div className="tabela-funcionarios">
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Cargo</th>
                    <th>Ativo</th>
                    <th style={{ textAlign: 'center' }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {funcionarios.map((func) => (
                    <tr key={func.id}>
                      <td>{func.nome}</td>
                      <td>{func.cargo}</td>
                      <td>{func.ativo ? 'Sim' : 'Não'}</td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          className="btn-acao btn-editar"
                          onClick={() => {
                            setEditando(func)
                            setForm({
                              nome: func.nome,
                              cpf: '',
                              senha: '',
                              cargo: func.cargo,
                              ativo: func.ativo,
                            })
                            setShowModal(true)
                          }}
                        >
                          Editar
                        </button>
                        <button
                          className="btn-acao btn-excluir"
                          onClick={() => handleDelete(func.id)}
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <button
            className="botao-novo-usuario"
            onClick={() => {
              setEditando(null)
              setForm({ nome: '', cpf: '', senha: '', cargo: '', ativo: true })
              setShowModal(true)
            }}
          >
            Cadastrar Novo Usuário
          </button>

          {showModal && (
            <div className="modal-overlay">
              <div className="modal">
                <h3>{editando ? 'Editar Funcionário' : 'Novo Funcionário'}</h3>
                <form onSubmit={handleSubmit}>
                  <input
                    name="nome"
                    placeholder="Nome"
                    onChange={handleChange}
                    value={form.nome}
                    required
                  />
                  {!editando && (
                    <input
                      name="cpf"
                      placeholder="CPF"
                      onChange={handleChange}
                      value={form.cpf}
                      required
                      inputMode="numeric"
                      maxLength={14}
                    />
                  )}
                  <input
                    name="senha"
                    type="password"
                    placeholder="Senha"
                    onChange={handleChange}
                    value={form.senha}
                    required={!editando}
                  />
                  <input
                    name="cargo"
                    placeholder="Cargo"
                    onChange={handleChange}
                    value={form.cargo}
                    required
                  />
                  <select name="ativo" value={form.ativo ? 'true' : 'false'} onChange={handleChange}>
                    <option value="true">Ativo</option>
                    <option value="false">Inativo</option>
                  </select>
                  <div className="modal-actions">
                    <button type="submit">Salvar</button>
                    <button type="button" onClick={() => setShowModal(false)}>
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {mensagem && (
            <div className={`toast ${mensagem.includes('Erro') ? 'erro' : 'sucesso'}`}>
              {mensagem}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
