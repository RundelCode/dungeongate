import { apiFetch } from './fetch'

export type Game = {
    id: string
    name: string
    description: string | null
    mode: string
    status: string
    max_players: number
}

export async function getMyGames(): Promise<Game[]> {
    return apiFetch<Game[]>('/games/me')
}
