'use client'

import Image from 'next/image'
import './estoque.css'

export default function Estoque() {
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
          <h2 className="estoque-titulo">Estoque Atual</h2>

          <div className="tabela-estoque">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Preço (R$)</th>
                  <th>Estoque</th>
                  <th>Quantidade</th>
                  <th>Unidade</th>
                  <th>Ativo</th>
                  <th style={{ textAlign: 'center' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Pilsen 600ml</td>
                  <td>Cerveja leve e refrescante</td>
                  <td>8.50</td>
                  <td>120</td>
                  <td>600</td>
                  <td>ml</td>
                  <td>Sim</td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn-estoque btn-editar">Editar</button>
                    <button className="btn-estoque btn-excluir">Excluir</button>
                  </td>
                </tr>
                <tr>
                  <td>IPA 350ml</td>
                  <td>Cerveja com amargor intenso</td>
                  <td>9.90</td>
                  <td>75</td>
                  <td>350</td>
                  <td>ml</td>
                  <td>Não</td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn-estoque btn-editar">Editar</button>
                    <button className="btn-estoque btn-excluir">Excluir</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button className="botao-cadastrar-cerveja">Cadastrar Cerveja</button>
        </div>
      </main>
    </div>
  )
}
