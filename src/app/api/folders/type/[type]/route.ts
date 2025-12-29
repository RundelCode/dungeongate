import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(
    request: Request,
    { params }: { params: { type: string } }
) {
    const { type } = await params

    const token = (await cookies()).get('access_token')?.value
    

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/folders/${type}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: 'no-store',
        }
    )

    if (!res.ok) {
        return NextResponse.json(
            { message: 'Failed to fetch folders' },
            { status: res.status }
        )
    }

    const data = await res.json()
    return NextResponse.json(data)
}
