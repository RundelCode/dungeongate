import { cookies } from 'next/headers'

export async function apiFetchServer<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value

    if (!token) {
        throw new Error('No auth token')
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${path}`,
        {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                ...options.headers,
            },
            cache: 'no-store',
        }
    )

    if (!res.ok) {
        throw new Error('API error')
    }

    return res.json()
}
