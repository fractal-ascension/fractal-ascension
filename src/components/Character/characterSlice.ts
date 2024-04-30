import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface Stats {
  hp: number;
  maxHp: number;
  hunger: number;
  maxHunger: number;
  sp: number;
  maxSp: number;
  thirst: number;
  maxThirst: number;
  mp: number;
  maxMp: number;
  sleep: number;
  maxSleep: number;
  energy: number;
  maxEnergy: number;
  xp: number;
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
  lefthand: string | null;
  righthand: string | null;
  head: string | null;
  body: string | null;
  arms: string | null;
  legs: string | null;
  feet: string | null;
  accessory: string | null;
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

export const initialState: CharacterState = {
  name: "You",
  title: "Nobody",
  level: 1,
  stats: {
    hp: 4,
    maxHp: 10,
    hunger: 40,
    maxHunger: 100,
    sp: 4,
    maxSp: 10,
    thirst: 40,
    maxThirst: 100,
    mp: 4,
    maxMp: 10,
    sleep: 40,
    maxSleep: 100,
    energy: 40,
    maxEnergy: 100,
    xp: 40,
    nextLevelExperience: 100,
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
    lefthand: "Item",
    righthand: null,
    head: null,
    body: null,
    arms: null,
    legs: null,
    feet: null,
    accessory: null,
  },
  combat: {
    hitChance: 0.1,
    dodgeChance: 0.001,
    criticalChance: 0.001,
  },
};

// Define an async thunk for saving character data
export const saveCharacter = createAsyncThunk("character/saveCharacter", async (_, { getState }) => {
  const state = getState() as RootState; // Ensure you have a RootState type defined in your store.ts
  localStorage.setItem("characterState", JSON.stringify(state.character));
});

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    takeDamage: (state, action: PayloadAction<number>) => {
      state.stats.hp = Math.max(state.stats.hp - action.payload, 0);
    },
    heal: (state, action: PayloadAction<number>) => {
      state.stats.hp = Math.min(state.stats.hp + action.payload, state.stats.maxHp);
    },
    gainExperience: (state, action: PayloadAction<number>) => {
      state.stats.xp += action.payload;
      while (state.stats.xp >= state.stats.nextLevelExperience) {
        state.stats.xp -= state.stats.nextLevelExperience;
        state.level += 1;
        state.stats.nextLevelExperience = calculateNextLevelExperience(state.level);
        state.stats.maxHp += 10;
        state.stats.hp = state.stats.maxHp;
      }
    },
    equipItem: (state, action: PayloadAction<{ slot: keyof Equipment; item: string }>) => {
      const { slot, item } = action.payload;
      if (state.equipment[slot] === null) {
        state.equipment[slot] = item;
      }
    },
    unequipItem: (state, action: PayloadAction<{ slot: keyof Equipment }>) => {
      const { slot } = action.payload;
      state.equipment[slot] = null;
    },
    updateCharacterName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

function calculateNextLevelExperience(level: number): number {
  return Math.floor(100 * Math.pow(1.1, level));
}

export const { takeDamage, heal, gainExperience, equipItem, unequipItem, updateCharacterName } = characterSlice.actions;
export default characterSlice.reducer;
