import { Skill } from "../Skills";

export enum ForagingSkillId {
  Foraging = "Foraging",
}

export enum ForagingEffectId {
  ForagingPower = "ForagingPower",
  ForagingSkill = "ForagingSkill",
  ForagingStrength = "ForagingStrength",
  ForagingFamiliarization = "ForagingFamiliarization",
}

export enum ForagingEffectDescription {
  IncreaseForagingPower = "IncreaseForagingPower",
  IncreaseForagingSkill = "IncreaseForagingSkill",
  IncreaseForagingStrength = "IncreaseForagingStrength",
  IncreaseForagingFamiliarization = "IncreaseForagingFamiliarization",
}

export enum ForagingRestrictionId {
  ForagingLocation = "ForagingLocation",
  ForagType = "ForagType",
}

export enum ForagingUnlockId {
  Tool = "Tool",
  Area = "Area",
}

const ForagingSkill: Skill = {
  id: ForagingSkillId.Foraging,
  name: "Foraging",
  description: "The art of catching Forag, junk, and treasures.",
  maxLevel: 100,
  effects: [
    {
      id: ForagingEffectId.ForagingPower,
      description: ForagingEffectDescription.IncreaseForagingPower,
      value: 10,
    },
    {
      id: ForagingEffectId.ForagingSkill,
      description: ForagingEffectDescription.IncreaseForagingSkill,
      value: 10,
    },
    {
      id: ForagingEffectId.ForagingStrength,
      description: ForagingEffectDescription.IncreaseForagingStrength,
      value: 10,
    },
    {
      id: ForagingEffectId.ForagingFamiliarization,
      description: ForagingEffectDescription.IncreaseForagingFamiliarization,
      value: 1,
    },
  ],
  requirements: [
    { requirement: "Minimum Level", value: 5 },
    { requirement: "Basic Foraging Tools", value: 1 },
  ],
  levelUnlocks: [
    { level: 10, unlock: ForagingUnlockId.Tool },
    { level: 20, unlock: ForagingUnlockId.Area },
  ],
  active: true,
};

export { ForagingSkill };
