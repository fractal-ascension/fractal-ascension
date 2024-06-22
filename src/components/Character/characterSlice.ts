import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { CombatDamageParameters, BaseParameters, Stats, CombatStats } from "../../Utils/Data/Stats";

// Helper functions
const roundToOneDecimal = (value: number): number => Number(value.toFixed(1));

const calculateNextLevelExperience = (level: number): number => 99 + Math.pow(2, level) + 100 * Math.pow(level, 2);

// Warriors use strength and vitality for survival stats.
// Ranges use skills and perks for survival stats.
// Mages use spells and mana for survival stats.
const calculateBaseParameters = (level: number, stats: Stats): BaseParameters => ({
  hp: 100,
  hpRegen: roundToOneDecimal(0.1 + level * 0.1 + stats.vitality * 0.1),
  maxHp: 100 + level * 10 + stats.vitality * 20 + stats.strength * 10,
  hunger: 100,
  hungerRegen: -10.1,
  maxHunger: 100 + level * 10 + stats.vitality * 20,
  sp: 100,
  spRegen: roundToOneDecimal(0.1 + level * 0.1 + stats.vitality * 0.1),
  maxSp: 100 + level * 10 + stats.vitality * 20 + stats.strength * 10,
  thirst: 100,
  thirstRegen: -0.1,
  maxThirst: 100 + level * 10 + stats.vitality * 20,
  mp: 100,
  mpRegen: roundToOneDecimal(0.1 + level * 0.1 + stats.wisdom * 0.1),
  maxMp: 100 + level * 10 + stats.wisdom * 20 + stats.intelligence * 10,
  sleep: 100,
  sleepRegen: -0.1,
  maxSleep: 100 + level * 10 + stats.vitality * 20,
  energy: 100,
  energyRegen: -0.1,
  maxEnergy: 100 + level * 10 + stats.vitality * 20,
  xp: 0,
  nextLevelExperience: calculateNextLevelExperience(level),
});

const updateCharacterParameters = (state: CharacterState) => {
  const { level, stats } = state;
  const baseParameters = calculateBaseParameters(level, stats);

  const parametersToRound: (keyof BaseParameters)[] = ["hpRegen", "spRegen", "mpRegen", "hungerRegen", "thirstRegen", "sleepRegen", "energyRegen"];
  parametersToRound.forEach((param) => {
    state.parameters[param] = roundToOneDecimal(baseParameters[param]);
  });

  const maxParameters: (keyof BaseParameters)[] = ["maxHp", "maxSp", "maxMp", "maxHunger", "maxThirst", "maxSleep", "maxEnergy"];
  maxParameters.forEach((param) => {
    state.parameters[param] = baseParameters[param];
  });

  state.parameters.nextLevelExperience = baseParameters.nextLevelExperience;

  state.hasHungerDecay = false;
  state.hasThirstDecay = false;
  state.hasSleepDecay = false;
  state.hasEnergyDecay = false;
};

const applyEffect = (character: CharacterState, effect: StatusEffect): void => {
  character.statEffects.push({
    affectedStat: effect.effect,
    effectAmount: effect.effectAmount,
    effectApplication: effect.effectType === EffectType.SUBTRACT_PARAMETER ? "incrementParameter" : "multiplyStat",
    effectType: effect.effectType === EffectType.SUBTRACT_PARAMETER ? "timeIncremental" : "active",
    effectCause: effect.id,
  });

  reapplyStatEffects(character);
};

const reapplyStatEffects = (state: CharacterState): void => {
  state.stats = { ...state.characterStats };

  state.statEffects.forEach((effect) => {
    if (effect.effectType === "timeIncremental") {
      const statKey = effect.affectedStat as keyof BaseParameters;
      state.parameters[statKey] += effect.effectAmount;
    } else if (effect.effectType === "active") {
      const statKeys = effect.affectedStat === "all" ? Object.keys(state.stats) : [effect.affectedStat];
      statKeys.forEach((key) => {
        const statKey = key as keyof Stats;
        state.stats[statKey] = state.characterStats[statKey] * effect.effectAmount;
      });
    }
  });
};

const updateStatusEffects = (state: CharacterState): void => {
  state.statuses = state.statuses.filter((status) => {
    status.duration -= 1;
    return status.duration > 0;
  });

  const activeStatusIds = new Set(state.statuses.map((status) => status.id));
  state.statEffects = state.statEffects.filter((effect) => activeStatusIds.has(effect.effectCause));

  reapplyStatEffects(state);
};

const handleDeath = (state: CharacterState) => {
  if (state.parameters.hp <= 0) {
    console.log("You have died.");

    Object.keys(state.parameters).forEach((key) => {
      const paramKey = key as keyof BaseParameters;
      if (paramKey.startsWith("max")) {
        const baseKey = paramKey.replace("max", "").toLowerCase() as keyof BaseParameters;
        state.parameters[baseKey] = state.parameters[paramKey] * 0.5;
      }
    });

    const existingStatusIndex = state.statuses.findIndex((status) => status.id === "resurrected");

    if (existingStatusIndex === -1) {
      state.statuses.push(resurrectedStatus);
      applyEffect(state, resurrectedStatus);
    } else {
      state.statuses[existingStatusIndex].duration = resurrectedStatus.duration;
    }
  }
};

export interface Equipment {
  head: string | null;
  amulet: string | null;
  body: string | null;
  leftArm: string | null;
  rightArm: string | null;
  leftRing: string | null;
  rightRing: string | null;
  leftWeapon: string | null;
  rightWeapon: string | null;
  belt: string | null;
  leftLeg: string | null;
  rightLeg: string | null;
  leftFoot: string | null;
  rightFoot: string | null;
}

export enum EquipmentSlot {
  Head = "head",
  Amulet = "amulet",
  Body = "body",
  LeftArm = "leftArm",
  RightArm = "rightArm",
  LeftRing = "leftRing",
  RightRing = "rightRing",
  LeftWeapon = "leftWeapon",
  RightWeapon = "rightWeapon",
  Belt = "belt",
  LeftLeg = "leftLeg",
  RightLeg = "rightLeg",
  LeftFoot = "leftFoot",
  RightFoot = "rightFoot",
}

export interface Tool {
  // Harvesting
  pickaxe: string | null;
  axe: string | null;
  sickle: string | null;
  shovel: string | null;

  // Capture
  net: string | null;
  bugNet: string | null;
  fishingRod: string | null;
  cage: string | null;

  // Survival
  manual: string | null;
}

export enum ToolSlot {
  Pickaxe = "pickaxe",
  Axe = "axe",
  Sickle = "sickle",
  Shovel = "shovel",

  Net = "net",
  BugNet = "bugNet",
  FishingRod = "fishingRod",
  Cage = "cage",

  Manual = "manual",
}

// Combination elements would combine and add based on player's base element values.
// Like, Steam would be Water * Fire, so if player has 10 Water and 5 Fire, Steam would be 15 damage.

export enum EffectType {
  SUBTRACT_PARAMETER = "subtractParameter",
  MULTIPLY_STAT = "multiplyStat",
}

export interface StatusEffect {
  id: string;
  name: string;
  description: string;
  duration: number;
  effectType: EffectType;
  effect: string;
  effectDescription: string[];
  effectAmount: number;
}

export interface Skill {
  id: string;
  level: number;
  experience: number;
}

export interface CharacterState {
  name: string;
  title: string;
  parameters: BaseParameters;
  level: number;
  stats: Stats;
  characterStats: Stats;
  statEffects: { affectedStat: string; effectAmount: number; effectApplication: string; effectType: string; effectCause: string }[];
  combatStats: CombatStats;
  equipment: Equipment;
  tool: Tool;
  skill: Skill[];
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

const initialCombatStats: CombatStats = {
  physicalDamage: 0,
  magicalDamage: 0,
  armor: 0,
  magicResistance: 0,
  blockChance: 0,
  dodgeChance: 0,
  criticalChance: 0,
  criticalMultiplier: 0,
  hitChance: 0,
  attackSpeed: 0,
  armorPenetration: 0,
  magicPenetration: 0,
};

export const initialState: CharacterState = {
  name: "You",
  title: "Nobody",
  level: 0,
  parameters: calculateBaseParameters(0, initialStats),
  stats: initialStats,
  characterStats: initialStats,
  statEffects: [],
  combatStats: initialCombatStats,
  equipment: {
    head: null,
    amulet: null,
    body: null,
    leftArm: null,
    rightArm: null,
    leftRing: null,
    rightRing: null,
    leftWeapon: null,
    rightWeapon: null,
    belt: null,
    leftLeg: null,
    rightLeg: null,
    leftFoot: null,
    rightFoot: null,
  },
  tool: {
    pickaxe: null,
    axe: null,
    sickle: null,
    shovel: null,
    net: null,
    bugNet: null,
    fishingRod: null,
    cage: null,
    manual: null,
  },
  skill: [],
  // If the same type of damage is applied, sum and divide by overlap.
  // For example, if both physical and magic, sum and divide by 2.
  // If both slashing, arcane, and fire, sum and divide by 3.
  // If different type, apply both.
  // For example, physical multiplies with slashing, multiplies with feather.
  combatDamageParameters: {
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

const resurrectedStatus: StatusEffect = {
  id: "resurrected",
  name: "Resurrected",
  description: "Recently resurrected by an unknown power. You feel weak.",
  duration: 4,
  effectType: EffectType.MULTIPLY_STAT,
  effect: "all",
  effectDescription: ["All stats reduced by 50%."],
  effectAmount: 0.5,
};

// Async thunks
export const saveCharacter = createAsyncThunk("character/saveCharacter", async (_, { getState }) => {
  const state = getState() as RootState;
  localStorage.setItem("characterState", JSON.stringify(state.character));
});

export const handleRegenAndDecay = createAsyncThunk("character/handleRegenAndDecay", async (_, { dispatch }) => {
  dispatch(regenAndDecay());
});

// Slice
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
        Object.keys(state.stats).forEach((key) => {
          const statKey = key as keyof Stats;
          state.stats[statKey] += 1;
          state.characterStats[statKey] += 1;
        });
        state.parameters.nextLevelExperience = calculateNextLevelExperience(state.level);
        updateCharacterParameters(state);
      }
    },
    modifyStat: (state, action: PayloadAction<{ statName: keyof Stats; value: number }>) => {
      const { statName, value } = action.payload;
      state.stats[statName] += value;
      state.characterStats[statName] += value;
      updateCharacterParameters(state);
    },
    equipEquipment: (state, action: PayloadAction<{ slot: keyof Equipment; item: string }>) => {
      const { slot, item } = action.payload;
      state.equipment[slot] = item;
    },
    unequipEquipment: (state, action: PayloadAction<{ slot: keyof Equipment }>) => {
      const { slot } = action.payload;
      state.equipment[slot] = null;
    },
    equipTool: (state, action: PayloadAction<{ slot: keyof Tool; item: string }>) => {
      const { slot, item } = action.payload;
      state.tool[slot] = item;
    },
    unequipTool: (state, action: PayloadAction<{ slot: keyof Tool }>) => {
      const { slot } = action.payload;
      state.tool[slot] = null;
    },
    updateCharacterName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    addStatus: (state, action: PayloadAction<StatusEffect>) => {
      state.statuses.push(action.payload);
      applyEffect(state, action.payload);
    },
    removeStatus: (state, action: PayloadAction<string>) => {
      state.statuses = state.statuses.filter((status) => status.id !== action.payload);
      updateCharacterParameters(state);
    },
    regenAndDecay: (state) => {
      updateStatusEffects(state);

      if (state.parameters.hp <= 0) {
        handleDeath(state);
      }

      const applyDecay = (regenValue: number, decayValue: number) => roundToOneDecimal(regenValue - Math.abs(decayValue));
      const removeDecay = (regenValue: number, decayValue: number) => roundToOneDecimal(regenValue + Math.abs(decayValue));

      const handleDecay = (
        resource: number,
        regenValue: number,
        decayFactors: { hp: number; sp: number; mp: number },
        stateFlag: keyof Pick<CharacterState, "hasHungerDecay" | "hasThirstDecay" | "hasSleepDecay" | "hasEnergyDecay">
      ) => {
        if (resource <= 0 && !state[stateFlag]) {
          state.parameters.hpRegen = applyDecay(state.parameters.hpRegen, regenValue * decayFactors.hp);
          state.parameters.spRegen = applyDecay(state.parameters.spRegen, regenValue * decayFactors.sp);
          state.parameters.mpRegen = applyDecay(state.parameters.mpRegen, regenValue * decayFactors.mp);
          state[stateFlag] = true;
        } else if (resource > 0 && state[stateFlag]) {
          state.parameters.hpRegen = removeDecay(state.parameters.hpRegen, regenValue * decayFactors.hp);
          state.parameters.spRegen = removeDecay(state.parameters.spRegen, regenValue * decayFactors.sp);
          state.parameters.mpRegen = removeDecay(state.parameters.mpRegen, regenValue * decayFactors.mp);
          state[stateFlag] = false;
        }
      };

      handleDecay(state.parameters.hunger, state.parameters.hungerRegen, { hp: 10, sp: 5, mp: 2 }, "hasHungerDecay");
      handleDecay(state.parameters.thirst, state.parameters.thirstRegen, { hp: 2, sp: 10, mp: 5 }, "hasThirstDecay");
      handleDecay(state.parameters.sleep, state.parameters.sleepRegen, { hp: 5, sp: 2, mp: 10 }, "hasSleepDecay");
      handleDecay(state.parameters.energy, state.parameters.energyRegen, { hp: 2, sp: 2, mp: 2 }, "hasEnergyDecay");

      const updateParameter = (param: keyof BaseParameters, regen: keyof BaseParameters, max: keyof BaseParameters) => {
        state.parameters[param] = roundToOneDecimal(Math.min(Math.max(state.parameters[param] + state.parameters[regen], 0), state.parameters[max]));
      };

      updateParameter("hp", "hpRegen", "maxHp");
      updateParameter("sp", "spRegen", "maxSp");
      updateParameter("mp", "mpRegen", "maxMp");
      updateParameter("hunger", "hungerRegen", "maxHunger");
      updateParameter("thirst", "thirstRegen", "maxThirst");
      updateParameter("sleep", "sleepRegen", "maxSleep");
      updateParameter("energy", "energyRegen", "maxEnergy");

      updateCharacterParameters(state);
    },
  },
});

export const { takeDamage, heal, gainExperience, modifyStat, equipEquipment, unequipEquipment, equipTool, unequipTool, updateCharacterName, addStatus, removeStatus, regenAndDecay } =
  characterSlice.actions;

export default characterSlice.reducer;
