
export type Game = {
    id: string
    name: string
    description: string | null
    mode: string
    status: 'active' | 'paused' | 'archived'
    max_players: number
    cover_url?: string | null
}

export async function getMyGames(): Promise<Game[]> {
    const res = await fetch('/api/games/me', { cache: 'no-store' })
    if (!res.ok) throw new Error('Error')
    return res.json()
}

export async function createGame(input: {
    name: string
    description?: string
    mode: string
    max_players: number
}): Promise<Game> {
    const res = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
    })

    if (!res.ok) throw new Error('Error')
    return res.json()
}

export async function joinGame(gameId: string): Promise<void> {
    const res = await fetch(`/api/games/${gameId}/join`, {
        method: 'POST',
    })

    if (!res.ok) throw new Error('Error')
}