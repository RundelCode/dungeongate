import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
    const token = (await cookies()).get('access_token')?.value
    const body = await req.json()

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/folders`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })

    const data = await res.json()
    return NextResponse.json(data)
}
