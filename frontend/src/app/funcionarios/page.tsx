'use client'

import Image from 'next/image'
import './funcionarios.css'

export default function Funcionarios() {
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
                  <tr>
                    <td>João Silva</td>
                    <td>Gerente</td>
                    <td>Sim</td>
                    <td style={{ textAlign: 'center' }}>
                      <button className="btn-acao btn-editar">Editar</button>
                      <button className="btn-acao btn-excluir">Excluir</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Maria Souza</td>
                    <td>Vendedora</td>
                    <td>Não</td>
                    <td style={{ textAlign: 'center' }}>
                      <button className="btn-acao btn-editar">Editar</button>
                      <button className="btn-acao btn-excluir">Excluir</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <button className="botao-novo-usuario">Cadastrar Novo Usuário</button>
        </div>
      </main>
    </div>
  )
}
