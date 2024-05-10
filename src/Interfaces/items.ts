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
    weaponType: WeaponType;
    attackSpeed: number;
    range: number;
    material: Material[];
    repairCost: number;
    rank: number;
    damage: {
      minDamage: number;
      maxDamage: number;
    };
    critical: {
      criticalChance: number;
      criticalMultiplier: number;
    };
    durability: {
      current: number;
      max: number;
    };
  };
}

export interface WeaponType {
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

export const Axe: WeaponType = {
  id: "axe",
  name: "Axe",
  attackType: "Melee",
  overallDamageType: "Physical",
  damageType: "Slashing",
  weightType: "Medium",
};

export const Club: WeaponType = {
  id: "club",
  name: "Club",
  attackType: "Melee",
  overallDamageType: "Physical",
  damageType: "Blunt",
  weightType: "Medium",
};

export const Hammer: WeaponType = {
  id: "hammer",
  name: "Hammer",
  attackType: "Melee",
  overallDamageType: "Physical",
  damageType: "Blunt",
  weightType: "Heavy",
};

export const ScrapWood: Material = {
  id: "scrapWood",
  name: "Scrap Wood",
  description: "A common material, easy to find and work with, lacks durability.",
};

export const ScrapStone: Material = {
  id: "scrapStone",
  name: "Scrap Stone",
  description: "A common material, durable and easy to find, hard to work with.",
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
