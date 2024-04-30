import { StatusEffect } from "../components/Character/characterSlice";

export const poisonEffect: StatusEffect = {
  id: "poison",
  name: "Poisoned",
  duration: 50,
  effectType: "reduceHp", // Define the type of effect
  effectAmount: 1, // Define the amount for the effect
};
