import { EffectType, StatusEffect } from "../../components/Character/characterSlice";

export const poisonEffect: StatusEffect = {
  id: "poisoned",
  name: "Poisoned",
  description: "You are poisoned, taking damage over time.",
  duration: 50,
  effectType: EffectType.REDUCE_HP, // Define the type of effect
  effectDescription: ["Take 10% of HP damage every tick."],
  effectAmount: 1, // Define the amount for the effect
};
