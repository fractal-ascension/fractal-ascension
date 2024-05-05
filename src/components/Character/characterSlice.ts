import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Stats } from "../../Interfaces/stats";

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

// Combination elements would combine and add based on player's base element values.
// Like, Steam would be Water * Fire, so if player has 10 Water and 5 Fire, Steam would be 15 damage.
interface OffensiveCombatParameters {
  weaponType: {
    meleeDamage: DamageParameters;
    rangedDamage: DamageParameters;
    magicDamage: DamageParameters;
  };
  damageType: {
    slashing: DamageParameters;
    piercing: DamageParameters;
    blunt: DamageParameters;
    arcane: DamageParameters;
    fire: DamageParameters;
    water: DamageParameters;
    earth: DamageParameters;
    air: DamageParameters;
    light: DamageParameters;
    dark: DamageParameters;
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
  combat: OffensiveCombatParameters;
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
    perception: 1,
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

interface ModifyStatPayload {
  statName: keyof Stats;
  value: number;
}

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
    modifyStat: (state, action: PayloadAction<ModifyStatPayload>) => {
      const { statName, value } = action.payload;
      const currentStatValue = state.stats[statName];
      const newStatValue = currentStatValue + value;
      state.stats[statName] = newStatValue;
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

export const {
  takeDamage,
  heal,
  gainExperience,
  equipItem,
  unequipItem,
  updateCharacterName,
  addStatus,
  removeStatus,
  updateStatuses,
  modifyStat,
} = characterSlice.actions;
export default characterSlice.reducer;
