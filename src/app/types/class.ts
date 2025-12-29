type AbilityKey = "str" | "dex" | "con" | "int_" | "wis" | "cha";

type StatBlock = Partial<Record<AbilityKey, number>>;


export type Class = {
    id: string;
    name: string;
    hit_die: string;

    primary_ability: string | null;
    saving_throw_proficiencies: string | null;

    armor_proficiencies: string | null;
    weapon_proficiencies: string | null;
    tool_proficiencies: string | null;

    spellcasting_ability: string | null;

    description: string | null;
    source: string;
    color: string | null;

    base_stats: StatBlock | null;
};