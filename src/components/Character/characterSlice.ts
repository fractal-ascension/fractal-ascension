import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { CombatDamageParameters, BaseParameters, Stats } from "../../Utils/Data/Stats";

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
  hp: 10,
  hpRegen: 0.1 + level * 0.1 + stats.vitality * 0.1,
  maxHp: 10 + level * 1 + stats.vitality * 2 + stats.strength * 1,
  hunger: 10,
  hungerRegen: -0.1, // Certain actions/skills/perks can increase or decrease
  maxHunger: 10 + level * 1 + stats.vitality * 2,
  sp: 10,
  spRegen: 0.1 + level * 0.1 + stats.vitality * 0.1,
  maxSp: 10 + level * 1 + stats.vitality * 2 + stats.strength * 1,
  thirst: 10,
  thirstRegen: -0.1, // Certain actions/skills/perks can increase or decrease
  maxThirst: 10 + level * 1 + stats.vitality * 2,
  mp: 10,
  mpRegen: 0.1 + level * 0.1 + stats.wisdom * 0.1,
  maxMp: 10 + level * 1 + stats.wisdom * 2 + stats.intelligence * 1,
  sleep: 10,
  sleepRegen: -0.1, // Certain actions/skills/perks can increase or decrease
  maxSleep: 10 + level * 1 + stats.vitality * 2,
  energy: 10,
  energyRegen: -0.1, // Certain actions/skills/perks can increase or decrease
  maxEnergy: 10 + level * 1 + stats.vitality * 2,
  xp: 0,
  nextLevelExperience: 99 + Math.pow(3.5, level),
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
  // If the same type of damage is applied, sum and divide by overlap.
  // For example, if both physical and magic, sum and divide by 2.
  // If both slashing, arcane, and fire, sum and divide by 3.
  // If different type, apply both.
  // For example, physical multiplies with slashing, multiplies with feather.
  combatDamageParameters: {
    combatType: {
      meleeDamage: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      rangedDamage: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      magicDamage: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
    },
    overallDamageType: {
      physical: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      magical: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
    },
    damageType: {
      slashing: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      piercing: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      blunt: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      arcane: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      fire: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      water: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      earth: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      air: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      light: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      dark: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
    },
    weightType: {
      feather: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      light: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      medium: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      heavy: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      titanic: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
    },
    weaponType: {
      axe: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      sword: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      claw: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },

      lance: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      spear: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      dagger: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },

      mace: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      polearm: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      gauntlet: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },

      crossbow: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      bow: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      dart: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },

      staff: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      tome: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
      wand: {
        damage: 0,
        attackSpeed: 0,
        cooldown: 0,
        criticalChance: 0,
        criticalMultiplier: 0,
        hitChance: 0,
        range: 0,
        armorPenetration: 0,
        magicPenetration: 0,
      },
    },
  },
  statuses: [],
};

const calculateNextLevelExperience = (level: number): number =>
  Math.ceil(99 + Math.pow(3.5, level));

// Define an async thunk for saving character data
export const saveCharacter = createAsyncThunk(
  "character/saveCharacter",
  async (_, { getState }) => {
    const state = getState() as RootState; // Ensure you have a RootState type defined in your store.ts
    localStorage.setItem("characterState", JSON.stringify(state.character));
  }
);

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
    modifyStat: (state, action: PayloadAction<{ statName: keyof Stats; value: number }>) => {
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
