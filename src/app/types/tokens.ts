export interface Token {
  id: string
  scene_id: string
  actor_in_game_id?: string

  label?: string
  kind: 'player' | 'npc' | 'object'

  icon_url?: string

  x: number
  y: number
  z_index: number

  is_visible_to_players: boolean

  created_at: string
  updated_at: string
}
