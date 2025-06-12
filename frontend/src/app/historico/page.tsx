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
  const [filtro, setFiltro] = useState('');
  const [campo, setCampo] = useState('funcionario');
  const [resultados, setResultados] = useState<Pedido[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/historico')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPedidos(data);
          setResultados(data);
        } else {
          setPedidos([]);
          setResultados([]);
        }
      })
      .catch(() => {
        setPedidos([]);
        setResultados([]);
      });
  }, []);

  const aplicarFiltro = () => {
    const termo = filtro.toLowerCase();

    const filtrado = pedidos.filter(p => {
      switch (campo) {
        case 'funcionario':
          return p.funcionario.nome.toLowerCase().includes(termo);
        case 'cpf':
          return (p.cpf_comprador || '').toLowerCase().includes(termo);
        case 'total':
          return p.total.toFixed(2).includes(termo);
        case 'pagamento':
          return p.forma_pagamento.toLowerCase().includes(termo);
        default:
          return true;
      }
    });

    setResultados(filtrado);
  };

  const limparFiltro = () => {
    setFiltro('');
    setCampo('funcionario');
    setResultados(pedidos);
  };

  return (
    <div className="painel-container">
      <main className="painel-conteudo">
        <div className="historico-wrapper">
          <div className="historico-header">
            <h2 className="historico-titulo">Histórico de Pedidos</h2>

            <div className="historico-pesquisa">
              <select value={campo} onChange={(e) => setCampo(e.target.value)}>
                <option value="funcionario">Funcionário</option>
                <option value="cpf">CPF</option>
                <option value="total">Total (R$)</option>
                <option value="pagamento">Forma de Pagamento</option>
              </select>

              <input
                type="text"
                placeholder="Pesquisar..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />

              <button onClick={aplicarFiltro}>🔍</button>
              <button onClick={limparFiltro} className="btn-limpar">❌</button>
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
                {resultados.map((pedido) => (
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
  );
}
