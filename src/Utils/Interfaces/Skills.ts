export interface Skill {
  id: string;
  name: string;
  description: string;
  level: { current: number; max: number };
  experience: { current: number; max: number };
  experienceGainMultiplier: number;
  effect: string[];
  requirements?: { requirement: string; value: number }[];
  levelUnlocks: { level: number; unlock: string }[];
  active: boolean;
}
