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
  hasHungerDecay: boolean;
  hasThirstDecay: boolean;
  hasSleepDecay: boolean;
  hasEnergyDecay: boolean;
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
  hpRegen: 0.1 + level * 0.1 + stats.vitality * 0.1,
  maxHp: 100 + level * 10 + stats.vitality * 20 + stats.strength * 10,
  hunger: 100,
  hungerRegen: -10.1, // Certain actions/skills/perks can increase or decrease
  maxHunger: 100 + level * 10 + stats.vitality * 20,
  sp: 100,
  spRegen: 0.1 + level * 0.1 + stats.vitality * 0.1,
  maxSp: 100 + level * 10 + stats.vitality * 20 + stats.strength * 10,
  thirst: 100,
  thirstRegen: -10.1, // Certain actions/skills/perks can increase or decrease
  maxThirst: 100 + level * 10 + stats.vitality * 20,
  mp: 100,
  mpRegen: 0.1 + level * 0.1 + stats.wisdom * 0.1,
  maxMp: 100 + level * 10 + stats.wisdom * 20 + stats.intelligence * 10,
  sleep: 100,
  sleepRegen: -10.1, // Certain actions/skills/perks can increase or decrease
  maxSleep: 100 + level * 10 + stats.vitality * 20,
  energy: 100,
  energyRegen: -10.1, // Certain actions/skills/perks can increase or decrease
  maxEnergy: 100 + level * 10 + stats.vitality * 20,
  xp: 0,
  nextLevelExperience: 99 + Math.pow(2, level) + 100 * Math.pow(level, 2),
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
  hasHungerDecay: false,
  hasThirstDecay: false,
  hasSleepDecay: false,
  hasEnergyDecay: false,
};

// Define an async thunk for saving character data
export const saveCharacter = createAsyncThunk(
  "character/saveCharacter",
  async (_, { getState }) => {
    const state = getState() as RootState;
    localStorage.setItem("characterState", JSON.stringify(state.character));
  }
);

export const handleRegenAndDecay = createAsyncThunk(
  "character/handleRegenAndDecay",
  async (_, { dispatch }) => {
    dispatch(regenAndDecay());
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

const updateCharacterParameters = (state: CharacterState) => {
  const { level, stats } = state;
  const baseParameters = calculateBaseParameters(level, stats);

  state.parameters.maxHp = baseParameters.maxHp;
  state.parameters.hpRegen = baseParameters.hpRegen;
  state.parameters.maxSp = baseParameters.maxSp;
  state.parameters.spRegen = baseParameters.spRegen;
  state.parameters.maxMp = baseParameters.maxMp;
  state.parameters.mpRegen = baseParameters.mpRegen;
  state.parameters.maxHunger = baseParameters.maxHunger;
  state.parameters.hungerRegen = baseParameters.hungerRegen;
  state.parameters.maxThirst = baseParameters.maxThirst;
  state.parameters.thirstRegen = baseParameters.thirstRegen;
  state.parameters.maxSleep = baseParameters.maxSleep;
  state.parameters.sleepRegen = baseParameters.sleepRegen;
  state.parameters.maxEnergy = baseParameters.maxEnergy;
  state.parameters.energyRegen = baseParameters.energyRegen;
  state.parameters.nextLevelExperience = baseParameters.nextLevelExperience;

  state.hasHungerDecay = false;
  state.hasThirstDecay = false;
  state.hasSleepDecay = false;
  state.hasEnergyDecay = false;
};

const calculateNextLevelExperience = (level: number): number =>
  99 + Math.pow(2, level) + 100 * Math.pow(level, 2);

const roundToOneDecimal = (value: number): number => {
  return parseFloat(value.toFixed(1));
};

const applyStatusEffect = (
  status: {
    effectType: string;
    duration: number;
    effectAmount: number;
  },
  stats: Stats
) => {
  if (status.effectType === "reduceAll" && status.duration > 0) {
    const effectAmount = status.effectAmount;
    const applyEffect = (value: number) => value * effectAmount;

    // Update actual stats and current parameters only
    stats.strength = Math.floor(applyEffect(stats.strength));
    stats.vitality = Math.floor(applyEffect(stats.vitality));
    stats.agility = Math.floor(applyEffect(stats.agility));
    stats.dexterity = Math.floor(applyEffect(stats.dexterity));
    stats.intelligence = Math.floor(applyEffect(stats.intelligence));
    stats.wisdom = Math.floor(applyEffect(stats.wisdom));
    stats.perception = Math.floor(applyEffect(stats.perception));
    stats.luck = Math.floor(applyEffect(stats.luck));
  }
};

const handleDeath = (
  isDead: boolean,
  parameters: BaseParameters,
  statuses: StatusEffect[],
  stats: Stats
) => {
  if (isDead) {
    console.log("You have died.");
    parameters.hp = parameters.maxHp * 0.5;
    parameters.sp = parameters.maxSp * 0.5;
    parameters.mp = parameters.maxMp * 0.5;
    parameters.hunger = parameters.maxHunger * 0.5;
    parameters.thirst = parameters.maxThirst * 0.5;
    parameters.sleep = parameters.maxSleep * 0.5;
    parameters.energy = parameters.maxEnergy * 0.5;

    const deadStatus = {
      id: "dead",
      name: "Dead",
      duration: 1,
      effectType: "reduceAll",
      effectAmount: 0.5,
    };

    const alreadyDead = statuses.some((status) => status.id === "dead");
    if (!alreadyDead) {
      statuses.push(deadStatus);
      applyStatusEffect(deadStatus, stats); // Apply effect only once when the player dies
    }
    return true;
  }
  return false;
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

        state.stats.agility += 1;
        state.stats.dexterity += 1;
        state.stats.intelligence += 1;
        state.stats.luck += 1;
        state.stats.perception += 1;
        state.stats.strength += 1;
        state.stats.vitality += 1;
        state.stats.wisdom += 1;

        state.parameters.nextLevelExperience = calculateNextLevelExperience(state.level);
        updateCharacterParameters(state);
      }
    },
    modifyStat: (state, action: PayloadAction<{ statName: keyof Stats; value: number }>) => {
      const { statName, value } = action.payload;
      state.stats[statName] += value;
      updateCharacterParameters(state);
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
          status.duration -= 1;
          applyEffect(state, status);
        }
      });
      state.statuses = state.statuses.filter((status) => status.duration !== 0);
    },
    regenAndDecay: (state) => {
      const { parameters, statuses, stats } = state;
      const isDead = parameters.hp <= 0;

      if (handleDeath(isDead, parameters, statuses, stats)) return;

      // Apply status effects
      statuses.forEach((status) => {
        if (status.id !== "dead") {
          applyStatusEffect(status, stats);
        }
      });

      // Decrement status durations and remove expired statuses
      state.statuses = state.statuses
        .map((status) => ({
          ...status,
          duration: status.duration > 0 ? status.duration - 1 : 0,
        }))
        .filter((status) => status.duration > 0);

      const applyDecay = (regenValue: number, decayValue: number) =>
        roundToOneDecimal(regenValue - Math.abs(decayValue));
      const removeDecay = (regenValue: number, decayValue: number) =>
        roundToOneDecimal(regenValue + Math.abs(decayValue));

      const handleDecay = (
        resource: number,
        regenValue: number,
        decayFactors: { hp: number; sp: number; mp: number },
        stateFlag: "hasHungerDecay" | "hasThirstDecay" | "hasSleepDecay" | "hasEnergyDecay"
      ) => {
        if (isDead) return; // Skip decay if player is dead
        if (resource === 0 && !state[stateFlag]) {
          parameters.hpRegen = applyDecay(parameters.hpRegen, regenValue * decayFactors.hp);
          parameters.spRegen = applyDecay(parameters.spRegen, regenValue * decayFactors.sp);
          parameters.mpRegen = applyDecay(parameters.mpRegen, regenValue * decayFactors.mp);
          state[stateFlag] = true;
        } else if (resource > 0 && state[stateFlag]) {
          parameters.hpRegen = removeDecay(parameters.hpRegen, regenValue * decayFactors.hp);
          parameters.spRegen = removeDecay(parameters.spRegen, regenValue * decayFactors.sp);
          parameters.mpRegen = removeDecay(parameters.mpRegen, regenValue * decayFactors.mp);
          state[stateFlag] = false;
        }
      };

      handleDecay(
        parameters.hunger,
        parameters.hungerRegen,
        { hp: 10, sp: 5, mp: 2 },
        "hasHungerDecay"
      );
      handleDecay(
        parameters.thirst,
        parameters.thirstRegen,
        { hp: 2, sp: 10, mp: 5 },
        "hasThirstDecay"
      );
      handleDecay(
        parameters.sleep,
        parameters.sleepRegen,
        { hp: 5, sp: 2, mp: 10 },
        "hasSleepDecay"
      );
      handleDecay(
        parameters.energy,
        parameters.energyRegen,
        { hp: 2, sp: 2, mp: 2 },
        "hasEnergyDecay"
      );

      parameters.hp = roundToOneDecimal(
        Math.min(parameters.hp + parameters.hpRegen, parameters.maxHp)
      );
      parameters.sp = roundToOneDecimal(
        Math.min(parameters.sp + parameters.spRegen, parameters.maxSp)
      );
      parameters.mp = roundToOneDecimal(
        Math.min(parameters.mp + parameters.mpRegen, parameters.maxMp)
      );
      parameters.hunger = roundToOneDecimal(
        Math.max(parameters.hunger + parameters.hungerRegen, 0)
      );
      parameters.thirst = roundToOneDecimal(
        Math.max(parameters.thirst + parameters.thirstRegen, 0)
      );
      parameters.sleep = roundToOneDecimal(Math.max(parameters.sleep + parameters.sleepRegen, 0));
      parameters.energy = roundToOneDecimal(
        Math.max(parameters.energy + parameters.energyRegen, 0)
      );
    },
  },
});

export const {
  takeDamage,
  heal,
  gainExperience,
  modifyStat,
  equipItem,
  unequipItem,
  updateCharacterName,
  addStatus,
  removeStatus,
  updateStatuses,
  regenAndDecay,
} = characterSlice.actions;

export default characterSlice.reducer;
