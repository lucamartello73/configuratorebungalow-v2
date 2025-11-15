'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (!error) {
      router.push('/admin')
    } else {
      alert('Credenziali non valide')
      console.error(error)
    }
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
        <p className="text-gray-600 text-center mb-6">Sistema Martello1930</p>
        
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full border rounded-lg px-4 py-2 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full border rounded-lg px-4 py-2 mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? 'Accesso...' : 'Accedi'}
          </button>
        </form>
      </div>
    </div>
  )
}
