import { NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const response = await fetch(`${API_URL}/api/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usernameOrEmail: body.usernameOrEmail,
        password: body.password,
      }),
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Authentication failed' },
        { status: response.status }
      )
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Authentication error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}