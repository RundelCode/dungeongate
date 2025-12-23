import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(
    req: Request,
    { params }: { params: { gameId: string } }
) {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value

    if (!token) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        )
    }

    const formData = await req.formData()

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/uploads/games/${params.gameId}/cover`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        }
    )

    if (!res.ok) {
        const text = await res.text()
        return NextResponse.json(
            { error: text || 'Upload failed' },
            { status: res.status }
        )
    }

    const data = await res.json()
    return NextResponse.json(data)
}
