export type Character = {
    id: string
    owner_id: string | null

    name: string
    is_npc: boolean
    level: number
    alignment: string | null
    description?: string | null

    class_id: string | null
    race_id: string | null
    background_id: string | null

    str: number
    dex: number
    con: number
    int_: number
    wis: number
    cha: number

    proficiency_bonus: number

    max_hp: number
    armor_class: number
    speed: number
    hit_dice: string | null
    passive_perception: number | null

    senses: string | null
    languages: string | null

    saving_throw_proficiencies: string | null
    skills_proficiencies: Record<string, boolean> | null

    spellcasting_ability: string | null

    experience: number
    notes: string | null

    avatar_url: string | null

    class?: {
        id: string
        name: string
        color: string | null
    } | null

    race?: {
        id: string
        name: string
        color: string | null
    } | null

    background?: {
        id: string
        name: string
    } | null

    created_at: string
    updated_at: string
}
