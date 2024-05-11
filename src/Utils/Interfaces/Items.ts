import { Stats } from "./Stats";

export type ItemType = "WPN" | "EQP" | "TOOL" | "USE" | "CMBT" | "ETC";
type AttackType = "Melee" | "Ranged" | "Magic";
type OverallDamageType = "Physical" | "Magical" | "Divine";
type DamageType =
  | "Slashing"
  | "Piercing"
  | "Blunt"
  | "Arcane"
  | "Fire"
  | "Water"
  | "Earth"
  | "Air"
  | "Light"
  | "Dark";
type WeightType = "Feather" | "Light" | "Medium" | "Heavy" | "Titanic";

export interface Items {
  items: Item[];
}
export interface Item {
  id: string;
  name: string;
  description: string;
  value: number;
  type: ItemType;
  amount: number;
  unique: boolean;
  weapon?: {
    weaponType: Weapon;
    attackSpeed: number;
    range: number;
    material: { material: Material; amount: number }[];
    rank: number; // Rank 0 1-5, 1 3-9, 2 6-15, 3 10-23, 4 15-33, 5 21-45, 6 28-59, 7 36-75, 8 45-91, 9 55-111, 10 66-133
    quality: number; // Multiplies damage, crit, durability, round down
    damage: {
      minDamage: number;
      maxDamage: number;
    };
    critical: {
      criticalChance: number;
      criticalMultiplier: number;
    };
    durability: {
      current: number; // Every attack reduces by 1, can be reduced more or less based on skills
      // Reduces buy/sell value by {current / max} value. Repairing increases by 20% of max value
      max: number;
    };
  };
  // Skills both have an effect that scales with level, and perks unlocked at certain levels (which can also scale)
  tool?: {
    skillDirectBonus?: [{ skill: string; value: number; cap: number }]; // Directly adds to skill level
    skillMultiplierBonus?: [{ skill: string; value: number; cap: number }]; // Multiplies skill effect (does not increase level) (continues to apply after cap, but weakened by {effect/(over cap + 1)})
    skillLearningBonus?: [{ skill: string; value: number; cap: number }]; // Adds to skill exp gain (continues to apply after cap, but weakened by {effect/(over cap + 1)})
    skillRestriction?: [{ skill: string; value: number }]; // Cannot be used without skill level
    statDirectBonus?: [{ stat: keyof Stats; value: number; cap: number }]; // Directly adds to stat level
    statMultiplierBonus?: [{ stat: keyof Stats; value: number; cap: number }]; // Multiplies stat effect (does not increase level) (continues to apply after cap, but weakened by {effect/(over cap + 1)})
    statRestriction?: [{ stat: keyof Stats; value: number }]; // Cannot be used without stat level
  };
}

export interface Weapon {
  id: string;
  name: string;
  attackType: AttackType;
  overallDamageType: OverallDamageType;
  damageType: DamageType;
  weightType: WeightType;
}

export interface Material {
  id: string;
  name: string;
  description: string;
}

export const Axe: Weapon = {
  id: "axe",
  name: "Axe",
  attackType: "Melee",
  overallDamageType: "Physical",
  damageType: "Slashing",
  weightType: "Medium",
};

export const Club: Weapon = {
  id: "club",
  name: "Club",
  attackType: "Melee",
  overallDamageType: "Physical",
  damageType: "Blunt",
  weightType: "Medium",
};

export const Hammer: Weapon = {
  id: "hammer",
  name: "Hammer",
  attackType: "Melee",
  overallDamageType: "Physical",
  damageType: "Blunt",
  weightType: "Heavy",
};

export const Sword: Weapon = {
  id: "sword",
  name: "Sword",
  attackType: "Melee",
  overallDamageType: "Physical",
  damageType: "Slashing",
  weightType: "Medium",
};

export const Bow: Weapon = {
  id: "bow",
  name: "Bow",
  attackType: "Ranged",
  overallDamageType: "Physical",
  damageType: "Piercing",
  weightType: "Medium",
};

export const ArcaneTome: Weapon = {
  id: "arcaneTome",
  name: "Arcane Tome",
  attackType: "Magic",
  overallDamageType: "Magical",
  damageType: "Arcane",
  weightType: "Medium",
};

export const ScrapWood: Material = {
  id: "scrapWood",
  name: "Scrap Wood",
  description: "Common wood, can be found anywhere and everywhere.",
};

export const ScrapStone: Material = {
  id: "scrapStone",
  name: "Scrap Stone",
  description: "Common stone, can be found anywhere and everywhere.",
};

export const Iron: Material = {
  id: "iron",
  name: "Iron",
  description: "Common metal, created by smelting ore.",
};

export const IronWood: Material = {
  id: "ironWood",
  name: "Iron Wood",
  description: "Wood infused with iron, incredibly durable and flexible.",
};

export const Paper: Material = {
  id: "paper",
  name: "Paper",
  description: "Simple material that brings records knowledge and magic.",
};

export const Ink: Material = {
  id: "ink",
  name: "Ink",
  description: "A dye used to record knowledge and magic.",
};

export const ArcaneGem: Material = {
  id: "arcaneGem",
  name: "Arcane Gem",
  description: "A gem infused with arcane energy.",
};

export const currencyBreakdown: Currency[] = [
  { divisor: 100000000000000, symbol: "F", fullName: "Fractal", color: "#c50101" },
  { divisor: 1000000000000, symbol: "E", fullName: "Essence", color: "#fff2b9" },
  { divisor: 10000000000, symbol: "M", fullName: "Mythril", color: "#bcb9ff" },
  { divisor: 100000000, symbol: "D", fullName: "Diamond", color: "#b9f2ff" },
  { divisor: 1000000, symbol: "P", fullName: "Platinum", color: "#e5e4e2" },
  { divisor: 10000, symbol: "G", fullName: "Gold", color: "#ffd700" },
  { divisor: 100, symbol: "S", fullName: "Silver", color: "#c0c0c0" },
  { divisor: 1, symbol: "C", fullName: "Copper", color: "#b87333" },
];

interface Currency {
  divisor: number;
  symbol: string;
  fullName: string;
  color: string;
}