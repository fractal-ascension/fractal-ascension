export interface BaseParameters {
  hp: number; 
  hpRegen: number; // Base 1 + 1 per level + 2 per vitality
  maxHp: number; //Base 100 + 10 per level + 5 per vitality + 2 per strength
  hunger: number;
  hungerRegen: number; // Base -0.1
  maxHunger: number; // Base 100 + 10 per level + 5 per vitality
  sp: number;
  spRegen: number; // Base 1 + 1 per level + 2 per vitality
  maxSp: number; //Base 100 + 10 per level + 5 per vitality + 2 per strength
  thirst: number;
  thirstRegen: number; // Base -0.1
  maxThirst: number; // Base 100 + 10 per level + 5 per vitality
  mp: number;
  mpRegen: number; // Base 1 + 1 per level + 2 per wisdom
  maxMp: number; // Base 100 + 10 per level + 5 per wisdom + 2 per intelligence
  sleep: number;
  sleepRegen: number; // Base -0.1
  maxSleep: number; // Base 100 + 10 per level + 5 per vitality
  energy: number;
  energyRegen: number; // Base -0.1
  maxEnergy: number; // Base 100 + 10 per level + 5 per vitality
  xp: number;
  nextLevelExperience: number // Base 100 + Base*1.1 per level;
}

export interface Stats {
  strength: number;
  vitality: number;
  agility: number;
  dexterity: number;
  intelligence: number;
  wisdom: number;
  perception: number;
  luck: number;
}

export interface StatTooltip {
  stat: Stats;
  effects: string[];
}

export const statAbbreviations = {
  strength: "STR",
  vitality: "VIT",
  agility: "AGI",
  dexterity: "DEX",
  intelligence: "INT",
  wisdom: "WIS",
  perception: "PER",
  luck: "LCK",
};

export const fullStatNames = {
  STR: "Strength",
  VIT: "Vitality",
  AGI: "Agility",
  DEX: "Dexterity",
  INT: "Intelligence",
  WIS: "Wisdom",
  PER: "Perception",
  LCK: "Luck",
};

export const statEffects = [{
    id: "strength",
    effects: ["Increases physical damage.", "Increases maximum health.", "Increases maximum stamina."],
  },
  {
    id: "vitality",
    effects: ["Increases maximum health.", "Increases maximum stamina."],
  },
  {
    id: "agility",
    effects: ["Increases dodge chance.", "Increases critical hit chance."],
  },
  {
    id: "dexterity",
    effects: ["Increases critical hit chance.", "Increases accuracy."],
  },
  {
    id: "intelligence",
    effects: ["Increases magical damage.", "Increases maximum mana."],
  },
  {
    id: "wisdom",
    effects: ["Increases maximum mana."],
  },
  {
    id: "perception",
    effects: ["Increases attack speed.", "Increases dodge chance."],
  },
  {
    id: "luck",
    effects: ["Increases critical hit chance.", "Increases dodge chance."],
  },
];

export interface OffensiveCombatParameters {
  weaponType: {
    meleeDamage: DamageParameters;
    rangedDamage: DamageParameters;
    magicDamage: DamageParameters;
  };
  damageType: {
    physical: DamageParameters; // Multiplies with Slash, Pierce, Blunt
    slashing: DamageParameters;
    piercing: DamageParameters;
    blunt: DamageParameters;

    magical: DamageParameters; // Multiplies with Fire, Water, Earth, Air, Arcane
    arcane: DamageParameters;
    fire: DamageParameters;
    water: DamageParameters;
    earth: DamageParameters;
    air: DamageParameters;
    light: DamageParameters;
    dark: DamageParameters;

    // Future Damage Type: Holy/Unholy/Spiritual/Demonic/Undead (Clerical style)
  };
  weightType: {
    feather: DamageParameters;
    light: DamageParameters;
    medium: DamageParameters;
    heavy: DamageParameters;
    titanic: DamageParameters;
  };
}

interface DamageParameters {
  damage: number;
  attackSpeed: number;
  criticalChance: number;
  criticalMultiplier: number;
  hitChance: number;
  armorPenetration: number;
  magicPenetration: number;
}