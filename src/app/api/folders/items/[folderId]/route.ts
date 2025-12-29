import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(
    request: Request,
    { params }: { params: { folderId: string } }
) {
    const { folderId } = await params
    const token = (await cookies()).get('access_token')?.value

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/folders/${folderId}/items`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: 'no-store',
        }
    )

    if (!res.ok) {
        return NextResponse.json(
            { message: 'Failed to fetch folder items' },
            { status: res.status }
        )
    }

    const data = await res.json()
    return NextResponse.json(data)
}
