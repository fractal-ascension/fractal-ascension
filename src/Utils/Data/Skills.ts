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

export const FishingSkills: Skill[] = [
  {
    id: "bare-hands-fishing",
    name: "Bare Hands Fishing",
    description: "Catch fish using nothing but your hands.",
    level: { current: 1, max: 10 },
    experience: { current: 0, max: 1000 },
    experienceGainMultiplier: 1.0,
    effect: ["+5% catch speed"],
    levelUnlocks: [
      { level: 3, unlock: "Increased catch rate" },
      { level: 5, unlock: "Ability to catch larger fish" },
      { level: 10, unlock: "Discover rare species" },
    ],
    active: true,
  },
  {
    id: "spear-fishing",
    name: "Spear Fishing",
    description: "Utilize a spear to fish in shallow waters.",
    level: { current: 1, max: 10 },
    experience: { current: 0, max: 1200 },
    experienceGainMultiplier: 1.2,
    effect: ["+10% accuracy", "+15% fish size"],
    levelUnlocks: [
      { level: 4, unlock: "Craft enhanced spears" },
      { level: 7, unlock: "Night fishing capability" },
      { level: 10, unlock: "Catch legendary fish" },
    ],
    active: true,
  },
  {
    id: "rod-fishing",
    name: "Rod Fishing",
    description: "Fish using a rod and reel, the classic way.",
    level: { current: 1, max: 20 },
    experience: { current: 0, max: 1500 },
    experienceGainMultiplier: 1.5,
    effect: ["+20% durability of equipment"],
    requirements: [{ requirement: "Own a fishing rod", value: 1 }],
    levelUnlocks: [
      { level: 5, unlock: "Learn bait mixing" },
      { level: 10, unlock: "Automatic reel upgrade" },
      { level: 15, unlock: "Weather prediction" },
      { level: 20, unlock: "Map legendary fishing spots" },
    ],
    active: true,
  },
  {
    id: "net-fishing",
    name: "Net Fishing",
    description: "Use nets to catch multiple fish at once.",
    level: { current: 1, max: 15 },
    experience: { current: 0, max: 1800 },
    experienceGainMultiplier: 1.8,
    effect: ["+25% catch quantity"],
    requirements: [{ requirement: "Complete Rod Fishing Level 10", value: 10 }],
    levelUnlocks: [
      { level: 3, unlock: "Craft lighter nets" },
      { level: 7, unlock: "Catch endangered species" },
      { level: 12, unlock: "Eco-friendly nets" },
      { level: 15, unlock: "Global fishing rights" },
    ],
    active: true,
  },
];

