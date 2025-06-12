'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {jwtDecode} from 'jwt-decode'
import Image from 'next/image'
import './login.css'

const formatarCPF = (cpf: string) => {
  const numeros = cpf.replace(/\D/g, '').slice(0, 11)
  if (numeros.length <= 3) return numeros
  if (numeros.length <= 6) return `${numeros.slice(0, 3)}.${numeros.slice(3)}`
  if (numeros.length <= 9) return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6)}`
  return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6, 9)}-${numeros.slice(9)}`
}

type TokenPayload = {
  sub: number
  nome: string
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

      if (!res.ok) throw new Error(await res.text())

      const data = await res.json()
      localStorage.setItem('token', data.access_token)

      const payload = jwtDecode<TokenPayload>(data.access_token)
      localStorage.setItem('id_funcionario', String(payload.sub))
      localStorage.setItem('nome_funcionario', payload.nome)

      router.push('/painel')
    } catch (err: any) {
      alert('Erro ao fazer login: ' + err.message)
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
          onChange={(e) => {
            const valor = e.target.value
            const numeros = valor.replace(/\D/g, '')
            if (numeros.length <= 11) setCpf(formatarCPF(numeros))
          }}
          className="login-input"
          maxLength={14}
          inputMode="numeric"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="login-input"
        />

        <button onClick={handleLogin} className="login-button">
          Entrar
        </button>
      </div>

      <div className="logo-frase-container">
        <Image src="/logo_frase.png" alt="Logo Frase" fill style={{ objectFit: 'contain' }} />
      </div>
    </div>
  )
}


