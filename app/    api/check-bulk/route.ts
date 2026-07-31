import { NextResponse } from 'next/server'
import dns from 'dns'
import net from 'net'

const checkEmail = async (email: string) => {
  const domain = email.split('@')[1]
  if (!domain) return { email, status: 'Invalid' }

  return new Promise((resolve) => {
    dns.resolveMx(domain, (err, addresses) => {
      if (err ||!addresses?.length) {
        resolve({ email, status: 'Invalid' })
        return
      }
      const mx = addresses.sort((a, b) => a.priority - b.priority)[0].exchange
      const socket = net.createConnection(25, mx)
      let step = 0
      let status = 'Unknown'
      socket.setTimeout(5000)
      socket.on('data', (data) => {
        const res = data.toString()
        if (step === 0) { socket.write(`HELO test.com\r\n`); step++ }
        else if (step === 1) { socket.write(`MAIL FROM: <test@test.com>\r\n`); step++ }
        else if (step === 2) { socket.write(`RCPT TO: <${email}>\r\n`); step++ }
        else if (step === 3) {
          if (res.includes('250')) status = 'Live'
          else if (res.includes('550')) status = 'Disable'
          else status = 'Verifikasi'
          socket.end()
        }
      })
      socket.on('end', () => resolve({ email, status }))
      socket.on('error', () => resolve({ email, status: 'Unknown' }))
      socket.on('timeout', () => { socket.destroy(); resolve({ email, status: 'Timeout' }) })
    })
  })
}

export async function POST(req: Request) {
  const { emails } = await req.json()
  const emailList = emails.split('\n').filter((e: string) => e.trim())
  const results = []
  for (const email of emailList) {
    const result = await checkEmail(email)
    results.push(result)
    await new Promise(r => setTimeout(r, 1000))
  }
  return NextResponse.json({ results })
        }
