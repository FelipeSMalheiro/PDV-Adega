'use client'

import Image from 'next/image'
import './historico.css'

export default function Historico() {
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
    <button>🔍</button> {/* Ícone de lupa virá depois */}
    <button>⚙️</button> {/* Ícone de filtro virá depois */}
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
                <tr>
                  <td>João Silva</td>
                  <td>2025-06-01 14:32</td>
                  <td>123.456.789-00</td>
                  <td>42.00</td>
                  <td>Cartão</td>
                  <td>
                    - Cerveja IPA (2x R$9,90)<br/>
                    - Pilsen 600ml (1x R$8,50)
                  </td>
                </tr>
                <tr>
                  <td>Ana Souza</td>
                  <td>2025-06-02 18:10</td>
                  <td>987.654.321-00</td>
                  <td>24.00</td>
                  <td>Dinheiro</td>
                  <td>
                    - Stout 500ml (2x R$12,00)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
