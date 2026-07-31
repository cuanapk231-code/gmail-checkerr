"use client"
import { useState } from 'react'

export default function Home() {
  const [emails, setEmails] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])

  const handleCheck = async () => {
    setLoading(true)
    setResults([])
    try {
      const res = await fetch('https://gmail-checkerr-gl9z.vercel.app/api/check-bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emails })
      })
      const data = await res.json()
      setResults(data.results)
    } catch (e) {
      alert('Gagal cek email')
    }
    setLoading(false)
  }

  return (
    <main style={{padding: 20, maxWidth: 700, margin: 'auto', fontFamily: 'sans-serif'}}>
      <h1>Gmail Bulk Checker</h1>
      <textarea 
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
        placeholder="Tempel email di sini, 1 baris 1 email"
        rows={10}
        style={{width: '100%', padding: 10, fontSize: 16}}
      />
      <button onClick={handleCheck} disabled={loading} style={{marginTop: 10, padding: '
