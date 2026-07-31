"use client"
import { useState } from 'react'

export default function Home() {
  const [emails, setEmails] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])

  const handleCheck = async () => {
    setLoading(true)
    setResults([])
    const res = await fetch('/api/check-bulk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emails })
    })
    const data = await res.json()
    setResults(data.results)
    setLoading(false)
  }

  return (
    <main style={{padding: 20, maxWidth: 700, margin: 'auto'}}>
      <h1>Gmail Bulk Checker</h1>
      <textarea 
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
        placeholder="Tempel email di sini, 1 baris 1 email"
        rows={10}
        style={{width: '100%'}}
      />
      <button onClick={handleCheck} disabled={loading}>
        {loading? 'Mengecek...' : 'Cek Email'}
      </button>
      
      {results.map((r, i) => (
        <p key={i}>{r.email} : <b>{r.status}</b></p>
      ))}
    </main>
  )
}
