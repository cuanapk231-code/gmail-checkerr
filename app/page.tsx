"use client"

import { useState } from "react"

export default function Home() {
  const [emails, setEmails] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])

  async function handleCheck() {
    setLoading(true)
    setResults([])
    const res = await fetch("/api/check-bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emails }),
    })
    const data = await res.json()
    setResults(data.results || [])
    setLoading(false)
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Gmail Bulk Checker</h1>
      <textarea
        rows={10}
        style={{ width: "100%" }}
        placeholder="Tempel email di sini, 1 baris 1 email"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
      />
      <button onClick={handleCheck} disabled={loading}>
        {loading ? "Mengecek..." : "Cek Email"}
      </button>

      <div style={{ marginTop: 20 }}>
        {results.map((r, i) => (
          <div key={i} style={{ color: r.status === "Mungkin Live" ? "green" : "red" }}>
            {r.email} : {r.status}
          </div>
        ))}
      </div>
    </div>
  )
                     }
