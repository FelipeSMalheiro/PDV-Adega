'use client'

import { useState } from 'react'
import Image from 'next/image'
import './login.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const handleFakeLogin = () => {
    alert(`Login com:\nEmail: ${email}\nSenha: ${senha}`)
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Acesso ao Sistema</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          className="login-input"
        />

        <button onClick={handleFakeLogin} className="login-button">
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
