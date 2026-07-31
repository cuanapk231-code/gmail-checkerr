import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { emails } = await req.json()
  const emailList = emails.split('\n').filter((e: string) => e.trim())
  
  const results = emailList.map(email => {
    email = email.trim()
    // 1. Cek format dasar
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { email, status: 'Invalid Format' }
    }
    
    // 2. Cek domain
    const domain = email.split('@')[1].toLowerCase()
    
    if (domain === 'gmail.com' || domain === 'yahoo.com' || domain === 'outlook.com') {
      return { email, status: 'Mungkin Live' }
    } else {
      return { email, status: 'Domain Tidak Dikenal' }
    }
  })
  
  return NextResponse.json({ results })
}
