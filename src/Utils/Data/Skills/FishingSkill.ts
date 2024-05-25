import { Skill } from "../Skills";

export enum FishingSkillId {
  Fishing = "Fishing",
}

export enum FishingEffectId {
  FishingPower = "FishingPower",
  FishingSkill = "FishingSkill",
  FishingStrength = "FishingStrength",
  FishingFamiliarization = "FishingFamiliarization",
}

export enum FishingRestrictionId {
  FishingLocation = "FishingLocation",
  FishType = "FishType",
}

export enum FishingUnlockId {
  Tool = "Tool",
  Area = "Area",
}

const fishingSkill: Skill = {
  id: FishingSkillId.Fishing,
  name: "Fishing",
  description: "The art of catching fish, junk, and treasures.",
  maxLevel: 100,
  effects: [
    {
      id: FishingEffectId.FishingPower,
      description: "IncreaseFishingPower",
      value: 10,
    },
    {
      id: FishingEffectId.FishingSkill,
      description: "IncreaseFishingSkill",
      value: 10,
    },
    {
      id: FishingEffectId.FishingStrength,
      description: "IncreaseFishingStrength",
      value: 10,
    },
    {
      id: FishingEffectId.FishingFamiliarization,
      description: "IncreaseFishingFamiliarization",
      value: 1,
    },
  ],
  requirements: [
    { requirement: "Minimum Level", value: 5 },
    { requirement: "Basic Fishing Tools", value: 1 },
  ],
  levelUnlocks: [
    { level: 10, unlock: FishingUnlockId.Tool },
    { level: 20, unlock: FishingUnlockId.Area },
  ],
  active: true,
};

export { fishingSkill };
