export type ResourceType =
    | 'item'
    | 'monster'
    | 'scene'
    | 'npc'

export interface BaseResource {
    id: string
    name: string

    owner_id: string | null
    is_public: boolean

    created_at?: string
    updated_at?: string
}
