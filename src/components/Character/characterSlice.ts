import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { CombatDamageParameters, BaseParameters, Stats } from "../../Interfaces/Stats";

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
  parameters: BaseParameters;
  level: number;
  stats: Stats;
  equipment: Equipment;
  combatDamageParameters: CombatDamageParameters;
  statuses: StatusEffect[];
}

const initialStats: Stats = {
  strength: 0,
  vitality: 0,
  agility: 0,
  dexterity: 0,
  intelligence: 0,
  wisdom: 0,
  perception: 0,
  luck: 0,
};

// Warriors use strength and vitality for survival stats.
// Ranges use skills and perks for survival stats.
// Mages use spells and mana for survival stats.
const calculateBaseParameters = (level: number, stats: Stats): BaseParameters => ({
  hp: 100,
  hpRegen: 1 + level * 1 + stats.vitality * 1,
  maxHp: 100 + level * 10 + stats.vitality * 5 + stats.strength * 2,
  hunger: 100,
  hungerRegen: -0.1,
  maxHunger: 100 + level * 10 + stats.vitality * 5,
  sp: 100,
  spRegen: 1 + level * 1 + stats.vitality * 1,
  maxSp: 100 + level * 10 + stats.vitality * 5 + stats.strength * 2,
  thirst: 100,
  thirstRegen: -0.1,
  maxThirst: 100 + level * 10 + stats.vitality * 5,
  mp: 100,
  mpRegen: 1 + level * 1 + stats.wisdom * 1,
  maxMp: 100 + level * 10 + stats.wisdom * 5 + stats.intelligence * 2,
  sleep: 100,
  sleepRegen: -0.1,
  maxSleep: 100 + level * 10 + stats.vitality * 5,
  energy: 100,
  energyRegen: -0.1,
  maxEnergy: 100 + level * 10 + stats.vitality * 5,
  xp: 0,
  nextLevelExperience: 99 + Math.pow(1.1, level),
});

export const initialState: CharacterState = {
  name: "You",
  title: "Nobody",
  level: 0,
  parameters: calculateBaseParameters(0, initialStats),
  stats: initialStats,
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
  combatDamageParameters: {
    combatType: {
      meleeDamage: {
        damage: 0,
        attackSpeed: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      rangedDamage: {
        damage: 0,
        attackSpeed: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      magicDamage: {
        damage: 0,
        attackSpeed: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
    },
    damageType: {
      physical: {
        damage: 0,
        attackSpeed: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      slashing: {
        damage: 0,
        attackSpeed: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      piercing: {
        damage: 0,
        attackSpeed: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      blunt: {
        damage: 0,
        attackSpeed: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      magical: {
        damage: 0,
        attackSpeed: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      arcane: {
        damage: 0,
        attackSpeed: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      fire: {
        damage: 0,
        attackSpeed: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      water: {
        damage: 0,
        attackSpeed: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      earth: {
        damage: 0,
        attackSpeed: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      air: {
        damage: 0,
        attackSpeed: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      light: {
        damage: 0,
        attackSpeed: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      dark: {
        damage: 0,
        attackSpeed: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
    },
    weightType: {
      feather: {
        damage: 0,
        attackSpeed: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      light: {
        damage: 0,
        attackSpeed: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      medium: {
        damage: 0,
        attackSpeed: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      heavy: {
        damage: 0,
        attackSpeed: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      titanic: {
        damage: 0,
        attackSpeed: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
    },
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
