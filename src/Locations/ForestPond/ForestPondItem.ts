export const ForestClearingItem = {
  items: [
    {
      id: "sturdyStick",
      name: "Sturdy Stick",
      desc: "A sturdy stick.",
      value: 0,
      type: "WPN",
      WPN: [
        {
          type: [{ attackType: "melee", damageType: "blunt", weaponType: "club" }],
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
          type: [{ attackType: "melee", damageType: "blunt", weaponType: "improvised" }],
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
