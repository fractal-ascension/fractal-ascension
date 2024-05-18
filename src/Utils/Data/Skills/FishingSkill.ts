import { Skill } from "../Skills";

export enum FishingSkillId {
  Fishing,
}

export enum FishingEffectId {
  FishingPower,
  FishingSkill,
  FishingStrength,
  BiteRate,
  CatchRate,
  Familiarization,
  MaxFamiliarityReward,
}

export enum FishingEffectDescription {
  IncreaseFishingPower,
  IncreaseFishingSkill,
  IncreaseFishingStrength,
  IncreaseBiteRate,
  IncreaseCatchRate,
  IncreaseFamiliarization,
  UniqueFishLoot,
}

export enum FishingRestrictionId {
  FishingLocation,
  FishType,
}

export enum FishingUnlockId {
  Tool,
  Area,
}

const fishingSkill: Skill = {
  id: FishingSkillId.Fishing,
  name: "Fishing",
  description: "The art of catching fish, junk, and treasures.",
  maxLevel: 100,
  effects: [
    {
      id: FishingEffectId.FishingPower,
      description: FishingEffectDescription.IncreaseFishingPower,
      value: 10,
    },
    {
      id: FishingEffectId.FishingSkill,
      description: FishingEffectDescription.IncreaseFishingSkill,
      value: 10,
    },
    {
      id: FishingEffectId.FishingStrength,
      description: FishingEffectDescription.IncreaseFishingStrength,
      value: 10,
    },
    {
      id: FishingEffectId.BiteRate,
      description: FishingEffectDescription.IncreaseBiteRate,
      value: 5,
      restriction: [
        { type: FishingRestrictionId.FishingLocation, value: 1 }, // Example: 1 for rivers
      ],
    },
    {
      id: FishingEffectId.CatchRate,
      description: FishingEffectDescription.IncreaseCatchRate,
      value: 5,
      restriction: [
        { type: FishingRestrictionId.FishingLocation, value: 2 }, // Example: 2 for ocean
      ],
    },
    {
      id: FishingEffectId.Familiarization,
      description: FishingEffectDescription.IncreaseFamiliarization,
      value: 1,
    },
    {
      id: FishingEffectId.MaxFamiliarityReward,
      description: FishingEffectDescription.UniqueFishLoot,
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
