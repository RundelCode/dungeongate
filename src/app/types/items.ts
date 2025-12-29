import { BaseResource } from './resources'

export type ItemType =
    | 'weapon'
    | 'armor'
    | 'consumable'
    | 'tool'
    | 'equipment'
    | 'magic'
    | 'misc'

export type ItemRarity =
    | 'common'
    | 'uncommon'
    | 'rare'
    | 'very_rare'
    | 'legendary'
    | 'artifact'

export interface Item extends BaseResource {
    type: ItemType
    rarity?: ItemRarity

    weight?: number
    cost?: string

    damage_formula?: string
    damage_type?: string

    properties?: Record<string, any>

    description?: string
    source: string
}
