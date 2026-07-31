export async function POST(req) {
  try {
    const { emails } = await req.json()
    const emailList = emails.split('\n').filter(e => e.trim())
    
    const results = emailList.map(email => {
      email = email.trim()
      if (email.includes('@gmail.com')) {
        return { email, status: 'Mungkin Live' }
      } else {
        return { email, status: 'Bukan Gmail' }
      }
    })
    
    return Response.json({ results })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
