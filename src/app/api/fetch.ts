export async function apiFetchClient<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${path}`,
        {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            credentials: 'include',
        }
    )

    if (!res.ok) {
        throw new Error('API error')
    }

    return res.json()
}
