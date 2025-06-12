'use client'

import { usePathname, useRouter } from 'next/navigation'

export default function BotaoSair() {
  const pathname = usePathname()
  const router = useRouter()

  // Não exibe na página de login
  if (pathname === '/login') return null

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('id_funcionario')
    router.push('/login')
  }

  return (
    <div style={{ textAlign: 'right', padding: '10px 20px' }}>
      <button
        onClick={handleLogout}
        style={{
          padding: '8px 16px',
          backgroundColor: '#c0392b',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Sair
      </button>
    </div>
  )
}
