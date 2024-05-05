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
