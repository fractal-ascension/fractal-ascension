import { EquipmentSlot, ToolSlot } from "../../components/Character/characterSlice";
import { SkillId } from "./Skills";
import { Stats } from "./Stats";

export enum ItemType {
  WPN = "WPN",
  EQP = "EQP",
  TOOL = "TOOL",
  USE = "USE",
  CMBT = "CMBT",
  ETC = "ETC",
}

export enum AttackType {
  Melee = "Melee",
  Ranged = "Ranged",
  Magic = "Magic",
}

export enum OverallDamageType {
  Physical = "Physical",
  Magical = "Magical",
}

export enum PhysicalDamageType {
  Slashing = "Slashing",
  Piercing = "Piercing",
  Blunt = "Blunt",
}

export enum MagicalDamageType {
  Arcane = "Arcane",
  Fire = "Fire",
  Water = "Water",
  Earth = "Earth",
  Air = "Air",
  Light = "Light",
  Dark = "Dark",
}

export enum WeightType {
  Feather = "Feather",
  Light = "Light",
  Medium = "Medium",
  Heavy = "Heavy",
  Titanic = "Titanic",
}

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
  img?: string;
  equipmentSlot?: EquipmentSlot;
  toolSlot?: ToolSlot;
  weapon?: {
    weaponType: Weapon;
    rank: number; // Rank 0 1-5, 1 3-9, 2 6-15, 3 10-23, 4 15-33, 5 21-45, 6 28-59, 7 36-75, 8 45-91, 9 55-111, 10 66-133
    quality: number; // Multiplies damage, crit, durability, round down

    attackSpeed: number;
    range: number;
    damage: {
      minDamage: number;
      maxDamage: number;
    };
    critical: {
      criticalChance: number;
      criticalMultiplier: number;
    };
  };
  // Skills both have an effect that scales with level, and perks unlocked at certain levels (which can also scale)
  tool?: {
    toolType: Tool;
    rank: number; // Rank 0 1-5, 1 3-9, 2 6-15, 3 10-23, 4 15-33, 5 21-45, 6 28-59, 7 36-75, 8 45-91, 9 55-111, 10 66-133
    quality: number; // Multiplies damage, crit, durability, round down

    skillDirectBonus?: { skill: SkillId; value: number; cap: number }[]; // Directly adds to skill level
    skillMultiplierBonus?: { skill: string; value: number; cap: number }[]; // Multiplies skill effect (does not increase level) (continues to apply after cap, but weakened by {effect/(over cap + 1)})
    skillLearningBonus?: { skill: string; value: number; cap: number }[]; // Adds to skill exp gain (continues to apply after cap, but weakened by {effect/(over cap + 1)})
    skillRestriction?: { skill: string; value: number }[]; // Cannot be used without skill level
    statDirectBonus?: { stat: keyof Stats; value: number; cap: number }[]; // Directly adds to stat level
    statMultiplierBonus?: { stat: keyof Stats; value: number; cap: number }[]; // Multiplies stat effect (does not increase level) (continues to apply after cap, but weakened by {effect/(over cap + 1)})
    statRestriction?: { stat: keyof Stats; value: number }[]; // Cannot be used without stat level
  };
}

export interface Weapon {
  id: string;
  name: string;
  attackType: AttackType;
  overallDamageType: OverallDamageType;
  damageType: PhysicalDamageType | MagicalDamageType;
  weightType: WeightType;
}

export interface Tool {
  id: string;
  name: string;
}

export const Axe: Weapon = {
  id: "axe",
  name: "Axe",
  attackType: AttackType.Melee,
  overallDamageType: OverallDamageType.Physical,
  damageType: PhysicalDamageType.Slashing,
  weightType: WeightType.Medium,
};

export const Club: Weapon = {
  id: "club",
  name: "Club",
  attackType: AttackType.Melee,
  overallDamageType: OverallDamageType.Physical,
  damageType: PhysicalDamageType.Blunt,
  weightType: WeightType.Medium,
};

export const Hammer: Weapon = {
  id: "hammer",
  name: "Hammer",
  attackType: AttackType.Melee,
  overallDamageType: OverallDamageType.Physical,
  damageType: PhysicalDamageType.Blunt,
  weightType: WeightType.Heavy,
};

export const Sword: Weapon = {
  id: "sword",
  name: "Sword",
  attackType: AttackType.Melee,
  overallDamageType: OverallDamageType.Physical,
  damageType: PhysicalDamageType.Slashing,
  weightType: WeightType.Medium,
};

export const Bow: Weapon = {
  id: "bow",
  name: "Bow",
  attackType: AttackType.Ranged,
  overallDamageType: OverallDamageType.Physical,
  damageType: PhysicalDamageType.Piercing,
  weightType: WeightType.Medium,
};

export const ArcaneTome: Weapon = {
  id: "arcaneTome",
  name: "Arcane Tome",
  attackType: AttackType.Magic,
  overallDamageType: OverallDamageType.Magical,
  damageType: MagicalDamageType.Arcane,
  weightType: WeightType.Light,
};

export const Manual: Tool = {
  id: "manual",
  name: "Manual",
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
