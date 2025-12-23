import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
        return NextResponse.json({ error: 'No file' }, { status: 400 })
    }

    const fd = new FormData()
    fd.append('file', file)

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/uploads/games/temp/cover`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: fd,
        }
    )

    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
}
