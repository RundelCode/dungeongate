export type Background = {
  id: string
  name: string
  stat_bonuses?: {
    str?: number
    dex?: number
    con?: number
    int?: number
    wis?: number
    cha?: number
  }
  traits?: string | null
  description: string | null;
}