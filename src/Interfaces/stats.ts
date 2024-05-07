export interface BaseParameters {
  hp: number;
  hpRegen: number; // Base 1 + 1 per level + 1 per vitality
  maxHp: number; //Base 100 + 10 per level + 5 per vitality + 2 per strength
  hunger: number;
  hungerRegen: number; // Base -0.1
  maxHunger: number; // Base 100 + 10 per level + 5 per vitality
  sp: number;
  spRegen: number; // Base 1 + 1 per level + 1 per vitality
  maxSp: number; //Base 100 + 10 per level + 5 per vitality + 2 per strength
  thirst: number;
  thirstRegen: number; // Base -0.1
  maxThirst: number; // Base 100 + 10 per level + 5 per vitality
  mp: number;
  mpRegen: number; // Base 1 + 1 per level + 1 per wisdom
  maxMp: number; // Base 100 + 10 per level + 5 per wisdom + 2 per intelligence
  sleep: number;
  sleepRegen: number; // Base -0.1
  maxSleep: number; // Base 100 + 10 per level + 5 per vitality
  energy: number;
  energyRegen: number; // Base -0.1
  maxEnergy: number; // Base 100 + 10 per level + 5 per vitality
  xp: number;
  nextLevelExperience: number; // Base 100 + Base*1.1 per level;
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

export const statEffects = [
  {
    id: "strength",
    effects: ["+2 Max HP & SP"],
  },
  {
    id: "vitality",
    effects: ["+5 Max HP & SP ", "+1 Regen HP & SP", "+5 Max Hunger & Thirst & Sleep & Energy"],
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
    effects: ["+2 Max MP"],
  },
  {
    id: "wisdom",
    effects: ["+5 Max MP ", "+1 Regen MP"],
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

export interface CombatDamageParameters {
  combatType: {
    meleeDamage: DamageDetails;
    rangedDamage: DamageDetails;
    magicDamage: DamageDetails;
  };

  overallDamageType: {
    physical: DamageDetails; // Multiplies with Slash, Pierce, Blunt
    magical: DamageDetails; // Multiplies with Fire, Water, Earth, Air, Arcane
  };

  damageType: {
    slashing: DamageDetails;
    piercing: DamageDetails;
    blunt: DamageDetails;

    arcane: DamageDetails;
    fire: DamageDetails;
    water: DamageDetails;
    earth: DamageDetails;
    air: DamageDetails;
    light: DamageDetails;
    dark: DamageDetails;

    // Future Damage Type: Holy/Unholy/Spiritual/Demonic/Undead (Clerical style)
  };

  weightType: {
    feather: DamageDetails;
    light: DamageDetails;
    medium: DamageDetails;
    heavy: DamageDetails;
    titanic: DamageDetails;
  };

  weaponType: {
    axe: DamageDetails; // Slash focus, high dmg, low speed
    sword: DamageDetails; // Slash focus, mid dmg, mid speed
    claw: DamageDetails; // Slash focus, low dmg, high speed

    lance: DamageDetails; // Piercing focus, high dmg, low speed
    spear: DamageDetails; // Piercing focus, mid dmg, mid speed
    dagger: DamageDetails; // Piercing focus, low dmg, high speed

    mace: DamageDetails; // Blunt focus, high dmg, low speed
    polearm: DamageDetails; // Blunt focus, mid dmg, mid speed
    gauntlet: DamageDetails; // Blunt focus, low dmg, high speed

    crossbow: DamageDetails; // Piercing focus, high dmg, low speed
    bow: DamageDetails; // Piercing focus, mid dmg, mid speed
    dart: DamageDetails; // Piercing focus, low dmg, high speed

    staff: DamageDetails; // Magic focus, high dmg, low speed
    tome: DamageDetails; // Magic focus, mid dmg, mid speed
    wand: DamageDetails; // Magic focus, low dmg, high speed
  };
}

interface DamageDetails {
  damage: number;
  attackSpeed: number;
  cooldown: number;
  criticalChance: number;
  criticalMultiplier: number;
  hitChance: number;
  armorPenetration: number;
  magicPenetration: number;
}
