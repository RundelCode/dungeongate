import { getAuthToken } from '../auth/cookies'

export async function apiFetch<T>(
    path: string,
    options?: RequestInit
): Promise<T> {
    const token = getAuthToken()

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${path}`,
        {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token && {
                    Authorization: `Bearer ${token}`,
                }),
            },
        }
    )

    if (!res.ok) {
        throw new Error('API error')
    }

    return res.json()
}
