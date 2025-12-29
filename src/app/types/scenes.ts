import { BaseResource } from './resources'

export type SceneType = 'battle' | 'exploration' | 'social' | 'cinematic'

export interface Scene extends BaseResource {
  game_id?: string | null
  scene_type: SceneType
  background_image_url?: string
}
