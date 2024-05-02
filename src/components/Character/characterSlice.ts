import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface Parameters {
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
}

interface Stats {
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

export interface StatusEffect {
  id: string;
  name: string;
  duration: number;
  effectType: string;
  effectAmount: number;
}

export interface CharacterState {
  name: string;
  title: string;
  parameters: Parameters;
  level: number;
  stats: Stats;
  equipment: Equipment;
  combat: Combat;
  statuses: StatusEffect[];
}

export const initialState: CharacterState = {
  name: "You",
  title: "Nobody",
  level: 1,
  parameters: {
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
  },
  stats: {
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
    lefthand: null,
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
  statuses: [],
};

const calculateNextLevelExperience = (level: number): number => Math.floor(100 * Math.pow(1.1, level));

// Define an async thunk for saving character data
export const saveCharacter = createAsyncThunk("character/saveCharacter", async (_, { getState }) => {
  const state = getState() as RootState; // Ensure you have a RootState type defined in your store.ts
  localStorage.setItem("characterState", JSON.stringify(state.character));
});

const applyEffect = (character: CharacterState, effect: StatusEffect) => {
  switch (effect.effectType) {
    case "reduceHp":
      character.parameters.hp = Math.max(character.parameters.hp - effect.effectAmount, 0);
      break;
    // Add more cases as needed for different types of effects
  }
};

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    takeDamage: (state, action: PayloadAction<number>) => {
      state.parameters.hp = Math.max(state.parameters.hp - action.payload, 0);
    },
    heal: (state, action: PayloadAction<number>) => {
      state.parameters.hp = Math.min(state.parameters.hp + action.payload, state.parameters.maxHp);
    },
    gainExperience: (state, action: PayloadAction<number>) => {
      state.parameters.xp += action.payload;
      while (state.parameters.xp >= state.parameters.nextLevelExperience) {
        state.parameters.xp -= state.parameters.nextLevelExperience;
        state.level += 1;
        state.parameters.nextLevelExperience = calculateNextLevelExperience(state.level);
        state.parameters.maxHp += 10;
        state.parameters.hp = state.parameters.maxHp;
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
    addStatus: (state, action) => {
      state.statuses.push(action.payload);
    },
    removeStatus: (state, action: PayloadAction<string>) => {
      state.statuses = state.statuses.filter((status) => status.id !== action.payload);
    },
    updateStatuses: (state) => {
      state.statuses.forEach((status) => {
        if (status.duration > 0) {
          status.duration -= 1; // Decrement the duration
          applyEffect(state, status); // Apply the effect based on the status details
        }
      });
      // Remove expired statuses
      state.statuses = state.statuses.filter((status) => status.duration !== 0);
    },
  },
});

export const { takeDamage, heal, gainExperience, equipItem, unequipItem, updateCharacterName, addStatus, removeStatus, updateStatuses } =
  characterSlice.actions;
export default characterSlice.reducer;
