"use client"
import { useState } from 'react'

export default function Home() {
  const [emails, setEmails] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  const handleCheck = async () => {
    setLoading(true)
    setResult('Mengecek...')
    // ini contoh doang, nanti ganti sama API beneran
    setTimeout(() => {
      setResult(`Selesai cek ${emails.split('\n').length} email`)
      setLoading(false)
    }, 2000)
  }

  return (
    <main style={{padding: 20}}>
      <h1>Gmail Bulk Checker</h1>
      <textarea 
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
        placeholder="Tempel email di sini, 1 baris 1 email"
        rows={10}
        style={{width: '100%'}}
      />
      <button onClick={handleCheck} disabled={loading}>
        {loading ? 'Loading...' : 'Cek Email'}
      </button>
      <p>{result}</p>
    </main>
  )
    }
