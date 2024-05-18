import {
  FishingEffectDescription,
  FishingEffectId,
  FishingRestrictionId,
  FishingSkillId,
  FishingUnlockId,
} from "./Skills/FishingSkill";

export type SkillId = FishingSkillId;
export type EffectId = FishingEffectId;
export type RestrictionId = FishingRestrictionId;
export type UnlockId = FishingUnlockId;
export type EffectDescription = FishingEffectDescription;

export const SkillIds = [FishingSkillId];
export const EffectIds = [FishingEffectId];
export const RestrictionIds = [FishingRestrictionId];
export const UnlockIds = [FishingUnlockId];
export const EffectDescriptions = [FishingEffectDescription];

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
  description: EffectDescription;
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
