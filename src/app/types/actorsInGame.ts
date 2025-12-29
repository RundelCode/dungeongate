export interface ActorInGame {
    id: string
    game_id: string

    base_character_id?: string
    base_monster_id?: string

    name_override?: string

    current_hp: number
    temp_hp: number

    max_hp_override?: number

    death_saves_success: number
    death_saves_fail: number

    is_conscious: boolean
    is_stable: boolean

    resources_json?: Record<string, any>

    created_at: string
    updated_at: string
}
