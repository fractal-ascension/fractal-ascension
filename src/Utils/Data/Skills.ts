export enum EffectId {
  FishingPower,
  FishingSkill,
  FishingStrength,
  BiteRate,
  CatchRate,
  Familiarization,
  MaxFamiliarityReward,
}

export enum RestrictionType {
  FishingLocation,
  FishType,
}

export enum UnlockType {
  Tool,
  Area,
}

export enum SkillId {
  Fishing,
}

export enum EffectDescription {
  IncreaseFishingPower,
  IncreaseFishingSkill,
  IncreaseFishingStrength,
  IncreaseBiteRate,
  IncreaseCatchRate,
  IncreaseFamiliarization,
  UniqueFishLoot,
}

interface Effect {
  id: EffectId;
  description: EffectDescription;
  value: number;
  restriction?: Restriction[];
}

interface Restriction {
  type: RestrictionType;
  value: number;
}

interface LevelUnlock {
  level: number;
  unlock: UnlockType;
}

export interface Skill {
  id: SkillId;
  name: string;
  description: string;
  maxLevel: number;
  effects: Effect[];
  requirements?: { requirement: string; value: number }[];
  levelUnlocks: LevelUnlock[];
  active: boolean;
}

// Sample Fishing Skill

const fishingSkill: Skill = {
  id: SkillId.Fishing,
  name: "Fishing",
  description: `
    Fishing is a core skill in Fractal Ascension, allowing players to catch fish, treasure, and junk from various locations such as:
    - Rivers of fresh water
    - The salty ocean
    - Corrosive seas of acid
    - The sky
    - Molten lava
  `,
  maxLevel: 100,
  effects: [
    {
      id: EffectId.FishingPower,
      description: EffectDescription.IncreaseFishingPower,
      value: 10,
    },
    {
      id: EffectId.FishingSkill,
      description: EffectDescription.IncreaseFishingSkill,
      value: 10,
    },
    {
      id: EffectId.FishingStrength,
      description: EffectDescription.IncreaseFishingStrength,
      value: 10,
    },
    {
      id: EffectId.BiteRate,
      description: EffectDescription.IncreaseBiteRate,
      value: 5,
      restriction: [
        { type: RestrictionType.FishingLocation, value: 1 }, // Example: 1 for rivers
      ],
    },
    {
      id: EffectId.CatchRate,
      description: EffectDescription.IncreaseCatchRate,
      value: 5,
      restriction: [
        { type: RestrictionType.FishingLocation, value: 2 }, // Example: 2 for ocean
      ],
    },
    {
      id: EffectId.Familiarization,
      description: EffectDescription.IncreaseFamiliarization,
      value: 1,
    },
    {
      id: EffectId.MaxFamiliarityReward,
      description: EffectDescription.UniqueFishLoot,
      value: 1,
    },
  ],
  requirements: [
    { requirement: "Minimum Level", value: 5 },
    { requirement: "Basic Fishing Tools", value: 1 },
  ],
  levelUnlocks: [
    { level: 10, unlock: UnlockType.Tool },
    { level: 20, unlock: UnlockType.Area },
  ],
  active: true,
};

export { fishingSkill };
