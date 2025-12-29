import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value

    if (!token) {
        return NextResponse.json(
            { message: 'Unauthorized' },
            { status: 401 }
        )
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/characters`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: 'no-store',
        }
    )

    if (!res.ok) {
        return NextResponse.json(
            { message: 'API error' },
            { status: res.status }
        )
    }

    const data = await res.json()
    return NextResponse.json(data)
}


export async function POST(req: Request) {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value

    if (!token) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        )
    }

    const body = await req.json()

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/characters`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    })

    const data = await res.json()

    return NextResponse.json(data, { status: res.status })
}
