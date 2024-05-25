import {
  FishingEffectId,
  FishingRestrictionId,
  FishingSkillId,
  FishingUnlockId,
} from "./Skills/FishingSkill";
import {
  ForagingEffectId,
  ForagingRestrictionId,
  ForagingSkillId,
  ForagingUnlockId,
} from "./Skills/ForagingSkill";
import {
  HuntingEffectId,
  HuntingRestrictionId,
  HuntingSkillId,
  HuntingUnlockId,
} from "./Skills/HuntingSkill";

// Union types to combine multiple enum values
export type SkillId = FishingSkillId | HuntingSkillId | ForagingSkillId;
export type EffectId = FishingEffectId | HuntingEffectId | ForagingEffectId;
export type RestrictionId = FishingRestrictionId | HuntingRestrictionId | ForagingRestrictionId;
export type UnlockId = FishingUnlockId | HuntingUnlockId | ForagingUnlockId;

export const SkillIds = [
  ...Object.values(FishingSkillId),
  ...Object.values(HuntingSkillId),
  ...Object.values(ForagingSkillId),
];
export const EffectIds = [
  ...Object.values(FishingEffectId),
  ...Object.values(HuntingEffectId),
  ...Object.values(ForagingEffectId),
];
export const RestrictionIds = [
  ...Object.values(FishingRestrictionId),
  ...Object.values(HuntingRestrictionId),
  ...Object.values(HuntingRestrictionId),
];
export const UnlockIds = [
  ...Object.values(FishingUnlockId),
  ...Object.values(HuntingUnlockId),
  ...Object.values(FishingUnlockId),
];

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

interface Effect {
  id: EffectId;
  description: string;
  value: number;
  restriction?: Restriction[];
}

interface Restriction {
  type: RestrictionId;
  value: number;
}

interface LevelUnlock {
  level: number;
  unlock: UnlockId;
}
