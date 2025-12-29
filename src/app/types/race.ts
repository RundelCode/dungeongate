type AbilityKey = "str" | "dex" | "con" | "int_" | "wis" | "cha";

type StatBlock = Partial<Record<AbilityKey, number>>;

export type Race = {
    id: string;
    name: string;
    size: string | null;
    speed: number | null;

    ability_bonuses: StatBlock | null;
    stat_bonuses: StatBlock | null;

    languages: string | null;
    traits: string | null;

    source: string;
    color: string | null;

    description: string | null;
};
