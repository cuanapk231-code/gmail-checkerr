import { NextResponse } from 'next/server'
import dns from 'dns/promises'

const checkEmail = async (email: string) => {
  // 1. Cek format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return { email, status: 'Invalid Format' }

  const domain = email.split('@')[1]

  try {
    // 2. Cek MX domain ada apa nggak
    const mxRecords = await dns.resolveMx(domain)
    if (mxRecords.length > 0) {
      return { email, status: 'Mungkin Live' } // Domain ada
    } else {
      return { email, status: 'Disable' }
    }
  } catch {
    return { email, status: 'Domain Tidak Ada' }
  }
}

export async function POST(req: Request) {
  const { emails } = await req.json()
  const emailList = emails.split('\n').filter((e: string) => e.trim())
  
  const results = await Promise.all(emailList.map(checkEmail))
  return NextResponse.json({ results })
}
