import { useSessionStore } from '../../stores/session.store'

export async function apiFetch(
    path: string,
    options: RequestInit = {},
) {
    const token = useSessionStore.getState().accessToken

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            ...options.headers,
        },
    })
}
