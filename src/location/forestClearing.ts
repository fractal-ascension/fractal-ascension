// forestClearing.js

import { max } from "lodash";
import Forest_Clearing from "../assets/Forest Clearing.jpg";
import { getIconById } from "../utils/icons";

export const ForestClearing = {
  title: "Forest Clearing",
  img: Forest_Clearing,
  description: [
    {
      id: "fc1",
      desc: "Your eyes open. The bright blue sky and waving trees greet you. A jolt of pain pierces through your head as you push your hands against the moist dirt and sharp grass in an effort to stand up. Wobbling, you manage to right yourself. Where are you? Who are you?",
    },
    {
      id: "fc2",
      desc: "Nothing immediately useful meets your eyes except a tattered book. You also grab a study stick and a round rock for primitive self-defense.",
    },
    {
      id: "fc3",
      desc: "The forest clearing is quiet, save for the rustling of leaves and the occasional chirp of a bird. The air is fresh and clean, and the sun is warm on your skin.",
    },
  ],
  activities: [
    {
      id: "fc1",
      name: "Look around for clues.",
      icon: getIconById("perception"),
      next: "fc2",
    },
    {
      id: "fc2",
      name: "Trade with village trader",
      icon: "🛒",
    },
    { name: "Work on the fields", icon: "🌾" },
    { name: "Go for a run around the village", icon: "🏃" },
    { name: "Try to carry some bags of grain", icon: "🎒" },
    { name: "Go to Shack", icon: "🏚️" },
    { name: "Go to Nearby cave", icon: "🕳️" },
    { name: "Enter the Infested field", icon: "🐀" },
  ],
  items: [
    {
      id: "sturdyStick",
      name: "Sturdy Stick",
      desc: "A sturdy stick.",
      value: 0,
      type: "WPN",
      WPN: [
        {
          type: [{attackType: "melee", damageType: "blunt", weaponType: "club" }],
          damage: [{ minDamage: 2, maxDamage: 3 }],
          critical: [{ criticalChance: 0.01, criticalMultiplier: 1.5 }],
          durability: [{ current: 100, max: 100 }],
          attackSpeed: 1.5,
          rank: 0,
        },
      ],
    },
    {
      id: "roundRock",
      name: "Round Rock",
      desc: "A round rock.",
      value: 0,
      type: "WPN",
      WPN: [
        {
          type: [{attackType: "melee", damageType: "blunt", weaponType: "improvised" }],
          damage: [{ minDamage: 1, maxDamage: 6 }],
          critical: [{ criticalChance: 0.01, criticalMultiplier: 1.5 }],
          durability: [{ current: 100, max: 100 }],
          attackSpeed: 3,
          rank: 0,
        },
      ],
    },
  ],
};
