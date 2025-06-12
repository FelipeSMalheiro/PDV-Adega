'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import './login.css'

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

export default function LoginPage() {
  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf, senha }),
      })

      if (!res.ok) {
        const erro = await res.text()
        throw new Error(erro || 'Erro ao fazer login')
      }

      const data = await res.json()

      // Armazena token e opcionalmente o ID do usuário
      localStorage.setItem('token', data.access_token)

      // Redireciona
      router.push('/painel')
    } catch (err: any) {
      alert('Erro ao fazer login: ' + err.message)
    }
  }

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value
    const numeros = valor.replace(/\D/g, '')
    if (numeros.length <= 11) {
      setCpf(formatarCPF(numeros))
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Acesso ao Sistema</h2>

        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={handleCpfChange}
          className="login-input"
          maxLength={14}
          inputMode="numeric"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          className="login-input"
        />

        <button onClick={handleLogin} className="login-button">
          Entrar
        </button>
      </div>

      <div className="logo-frase-container">
        <Image
          src="/logo_frase.png"
          alt="Logo Frase"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  )
}

