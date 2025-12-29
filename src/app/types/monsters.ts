import { BaseResource } from './resources'

export interface Monster extends BaseResource {
  size?: string
  type?: string
  subtype?: string

  max_hp: number
  armor_class: number
  speed: number

  str: number
  dex: number
  con: number
  int: number
  wis: number
  cha: number

  challenge_rating?: number

  abilities_json?: Record<string, any>
}
