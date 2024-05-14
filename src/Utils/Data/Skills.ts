// Enums for Effect IDs, Restriction Types, Unlock Types, Skill IDs, and Effect Descriptions
export enum EffectId {
  // Fishing Power determines the fish that could be caught (at 50% value), and the accuracy. Fish with difficulty of 10 could be caught at 5, but with an accuracy penalty.
  // Accuracy is determined by the difference between the fish difficulty and the power. If the power is 5, and the fish difficulty is 10, the accuracy would be 50%.
  FishingPower = "barehanded-fishing-power",
  // Fishing Accuracy is the chance of catching a fish. If the fish has a difficulty of 10, and the power is 5, the accuracy would be 50%.
  FishingAccuracy = "barehanded-fishing-accuracy",
  // Fishing Speed is by seconds. Fish would take 10s to catch, with +1 it would take 9s. Limit to 1s, additional would cause extra catches.
  FishingSpeed = "barehanded-fishing-speed",
}

export enum RestrictionType {
  Level = "barehanded-fishing-level",
}

export enum UnlockType {
  CatchRate = "Increased catch rate",
  LargerFish = "Ability to catch larger fish",
  RareSpecies = "Discover rare species",
}

export enum SkillId {
  Fishing = "fishing",
  BareHandedFishing = "bare-handed-fishing",
}

export enum EffectDescription {
  FishingPower = "Fishing Power",
  FishingAccuracy = "Fishing Accuracy",
  FishingSpeed = "Fishing Speed",
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
  effect: Effect[];
  requirements?: { requirement: string; value: number }[];
  levelUnlocks: LevelUnlock[];
  active: boolean;
}

// Move to character skill slice
// Function for dynamic experience calculation
// const calculateExperience = (level: number): number => {
//   return Math.pow(1.5, level) + 100 * Math.pow(level, 1.5);
// };

// Some fish can only be caught with specific tools, some cannot at all, like barehanded pufferfish.
// Skill mastery at level 100.
export const FishingSkills: Skill[] = [
  {
    id: SkillId.Fishing,
    name: "Fishing",
    description: "The ability to catch fish, treasure, and junk.",
    maxLevel: 100,
    effect: [
      {
        id: EffectId.FishingPower,
        description: EffectDescription.FishingPower,
        value: 5,
      },
      {
        id: EffectId.FishingAccuracy,
        description: EffectDescription.FishingAccuracy,
        value: 5,
        restriction: [{ type: RestrictionType.Level, value: 3 }],
      },
      {
        id: EffectId.FishingSpeed,
        description: EffectDescription.FishingSpeed,
        value: 1,
        restriction: [{ type: RestrictionType.Level, value: 5 }],
      },
    ],
    levelUnlocks: [
      { level: 1, unlock: UnlockType.CatchRate },
      { level: 2, unlock: UnlockType.LargerFish },
      { level: 3, unlock: UnlockType.RareSpecies },
      { level: 5, unlock: UnlockType.RareSpecies },
      { level: 10, unlock: UnlockType.RareSpecies },
      { level: 15, unlock: UnlockType.RareSpecies },
      { level: 20, unlock: UnlockType.RareSpecies },
      { level: 25, unlock: UnlockType.RareSpecies },
      { level: 30, unlock: UnlockType.RareSpecies },
      { level: 40, unlock: UnlockType.RareSpecies },
      { level: 50, unlock: UnlockType.RareSpecies },
      { level: 75, unlock: UnlockType.RareSpecies },
      { level: 100, unlock: UnlockType.RareSpecies },
    ],
    active: true,
  },
  {
    id: SkillId.BareHandedFishing,
    name: "Bare-handed Fishing",
    description: "Catch fish using nothing but your hands.",
    maxLevel: 100,
    // Move exp, exp mult, and current mult to a slice for character
    effect: [
      {
        id: EffectId.FishingPower,
        description: EffectDescription.FishingPower,
        value: 5,
      },
      {
        id: EffectId.FishingAccuracy,
        description: EffectDescription.FishingAccuracy,
        value: 5,
        restriction: [{ type: RestrictionType.Level, value: 3 }],
      },
      {
        id: EffectId.FishingSpeed,
        description: EffectDescription.FishingSpeed,
        value: 1,
        restriction: [{ type: RestrictionType.Level, value: 5 }],
      },
    ],
    levelUnlocks: [
      { level: 1, unlock: UnlockType.CatchRate },
      { level: 2, unlock: UnlockType.LargerFish },
      { level: 3, unlock: UnlockType.RareSpecies },
      { level: 5, unlock: UnlockType.RareSpecies },
      { level: 10, unlock: UnlockType.RareSpecies },
      { level: 15, unlock: UnlockType.RareSpecies },
      { level: 20, unlock: UnlockType.RareSpecies },
      { level: 25, unlock: UnlockType.RareSpecies },
      { level: 30, unlock: UnlockType.RareSpecies },
      { level: 40, unlock: UnlockType.RareSpecies },
      { level: 50, unlock: UnlockType.RareSpecies },
      { level: 75, unlock: UnlockType.RareSpecies },
      { level: 100, unlock: UnlockType.RareSpecies },
    ],
    active: true,
  },
  // {
  //   id: "spear-fishing",
  //   name: "Spear Fishing",
  //   description: "Utilize a spear to fish in shallow waters.",
  //   level: { current: 1, max: 10 },
  //   experience: { current: 0, max: 1200 },
  //   experienceGainMultiplier: 1.2,
  //   effect: ["+10% accuracy", "+15% fish size"],
  //   levelUnlocks: [
  //     { level: 4, unlock: "Craft enhanced spears" },
  //     { level: 7, unlock: "Night fishing capability" },
  //     { level: 10, unlock: "Catch legendary fish" },
  //   ],
  //   active: true,
  // },
  // {
  //   id: "rod-fishing",
  //   name: "Rod Fishing",
  //   description: "Fish using a rod and reel, the classic way.",
  //   level: { current: 1, max: 20 },
  //   experience: { current: 0, max: 1500 },
  //   experienceGainMultiplier: 1.5,
  //   effect: ["+20% durability of equipment"],
  //   requirements: [{ requirement: "Own a fishing rod", value: 1 }],
  //   levelUnlocks: [
  //     { level: 5, unlock: "Learn bait mixing" },
  //     { level: 10, unlock: "Automatic reel upgrade" },
  //     { level: 15, unlock: "Weather prediction" },
  //     { level: 20, unlock: "Map legendary fishing spots" },
  //   ],
  //   active: true,
  // },
  // {
  //   id: "net-fishing",
  //   name: "Net Fishing",
  //   description: "Use nets to catch multiple fish at once.",
  //   level: { current: 1, max: 15 },
  //   experience: { current: 0, max: 1800 },
  //   experienceGainMultiplier: 1.8,
  //   effect: ["+25% catch quantity"],
  //   requirements: [{ requirement: "Complete Rod Fishing Level 10", value: 10 }],
  //   levelUnlocks: [
  //     { level: 3, unlock: "Craft lighter nets" },
  //     { level: 7, unlock: "Catch endangered species" },
  //     { level: 12, unlock: "Eco-friendly nets" },
  //     { level: 15, unlock: "Global fishing rights" },
  //   ],
  //   active: true,
  // },
];
