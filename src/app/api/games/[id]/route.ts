import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function PATCH(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params

    console.log('PATCH GAME ID:', id)

    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value

    if (!token) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        )
    }

    const body = await req.json()

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/games/${id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        }
    )

    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
}
