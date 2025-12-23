import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(
    _req: Request,
    { params }: { params: { id: string } }
) {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value

    if (!token) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        )
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/games/${params.id}/join`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )

    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
}
