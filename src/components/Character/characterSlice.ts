import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Stats {
  hp: number;
  maxHp: number;
  sp: number;
  maxSp: number;
  mp: number;
  maxMp: number;
  energy: number;
  maxEnergy: number;
  experience: number;
  nextLevelExperience: number;
  strength: number;
  vitality: number;
  agility: number;
  dexterity: number;
  intelligence: number;
  wisdom: number;
  speed: number;
  luck: number;
}

interface Equipment {
  weapon: string | null;
  shield: string | null;
  head: string | null;
  leftArm: string | null;
  rightArm: string | null;
  body: string | null;
  legs: string | null;
  accessory: string | null;
  amulet: string | null;
  cybernetic: string | null;
}

interface Combat {
  hitChance: number;
  dodgeChance: number;
  criticalChance: number;
}

interface CharacterState {
  name: string;
  title: string;
  level: number;
  stats: Stats;
  equipment: Equipment;
  combat: Combat;
}

const initialState: CharacterState = {
  name: "You",
  title: "Nobody",
  level: 1,
  stats: {
    hp: 10,
    maxHp: 10,
    sp: 10,
    maxSp: 10,
    mp: 10,
    maxMp: 10,
    energy: 100,
    maxEnergy: 100,
    experience: 0,
    nextLevelExperience: 10,
    strength: 1,
    vitality: 1,
    agility: 1,
    dexterity: 1,
    intelligence: 1,
    wisdom: 1,
    speed: 1,
    luck: 1,
  },
  equipment: {
    weapon: null,
    shield: null,
    head: null,
    leftArm: null,
    rightArm: null,
    body: null,
    legs: null,
    accessory: null,
    amulet: "// LOCKED //",
    cybernetic: "// LOCKED //",
  },
  combat: {
    hitChance: 0.1,
    dodgeChance: 0.001,
    criticalChance: 0.001,
  },
};

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    takeDamage: (state, action: PayloadAction<number>) => {
      state.stats.hp = Math.max(state.stats.hp - action.payload, 0);
    },
    heal: (state, action: PayloadAction<number>) => {
      state.stats.hp = Math.min(
        state.stats.hp + action.payload,
        state.stats.maxHp
      );
    },
    gainExperience: (state, action: PayloadAction<number>) => {
      state.stats.experience += action.payload;
      while (state.stats.experience >= state.stats.nextLevelExperience) {
        state.stats.experience -= state.stats.nextLevelExperience;
        state.level += 1;
        state.stats.nextLevelExperience = calculateNextLevelExperience(
          state.level
        );
        state.stats.maxHp += 10;
        state.stats.hp = state.stats.maxHp;
      }
    },
    equipItem: (
      state,
      action: PayloadAction<{ slot: keyof Equipment; item: string }>
    ) => {
      const { slot, item } = action.payload;
      if (
        state.equipment[slot] === null ||
        state.equipment[slot] === "// LOCKED //"
      ) {
        state.equipment[slot] = item;
      }
    },
    unequipItem: (state, action: PayloadAction<{ slot: keyof Equipment }>) => {
      const { slot } = action.payload;
      state.equipment[slot] = null;
    },
    unlockSlot: (state, action: PayloadAction<{ slot: keyof Equipment }>) => {
      const { slot } = action.payload;
      if (state.equipment[slot] === "// LOCKED //") {
        state.equipment[slot] = null;
      }
    },
    lockSlot: (state, action: PayloadAction<{ slot: keyof Equipment }>) => {
      const { slot } = action.payload;
      if (state.equipment[slot] !== "// LOCKED //") {
        state.equipment[slot] = "// LOCKED //";
      }
    },
    updateCharacterName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

function calculateNextLevelExperience(level: number): number {
  return Math.floor(100 * Math.pow(1.1, level));
}

export const {
  takeDamage,
  heal,
  gainExperience,
  equipItem,
  unequipItem,
  unlockSlot,
  lockSlot,
  updateCharacterName,
} = characterSlice.actions;

export default characterSlice.reducer;
