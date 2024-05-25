import { Skill } from "../Skills";

export enum HuntingSkillId {
  Hunting = "Hunting",
}

export enum HuntingEffectId {
  HuntingPower = "HuntingPower",
  HuntingSkill = "HuntingSkill",
  HuntingStrength = "HuntingStrength",
  HuntingFamiliarization = "HuntingFamiliarization",
}

export enum HuntingEffectDescription {
  IncreaseHuntingPower = "IncreaseHuntingPower",
  IncreaseHuntingSkill = "IncreaseHuntingSkill",
  IncreaseHuntingStrength = "IncreaseHuntingStrength",
  IncreaseHuntingFamiliarization = "IncreaseHuntingFamiliarization",
}

export enum HuntingRestrictionId {
  HuntingLocation = "HuntingLocation",
  HuntType = "HuntType",
}

export enum HuntingUnlockId {
  Tool = "Tool",
  Area = "Area",
}

const HuntingSkill: Skill = {
  id: HuntingSkillId.Hunting,
  name: "Hunting",
  description: "The art of catching Hunt, junk, and treasures.",
  maxLevel: 100,
  effects: [
    {
      id: HuntingEffectId.HuntingPower,
      description: HuntingEffectDescription.IncreaseHuntingPower,
      value: 10,
    },
    {
      id: HuntingEffectId.HuntingSkill,
      description: HuntingEffectDescription.IncreaseHuntingSkill,
      value: 10,
    },
    {
      id: HuntingEffectId.HuntingStrength,
      description: HuntingEffectDescription.IncreaseHuntingStrength,
      value: 10,
    },
  ],
  requirements: [
    { requirement: "Minimum Level", value: 5 },
    { requirement: "Basic Hunting Tools", value: 1 },
  ],
  levelUnlocks: [
    { level: 10, unlock: HuntingUnlockId.Tool },
    { level: 20, unlock: HuntingUnlockId.Area },
  ],
  active: true,
};

export { HuntingSkill };
