// forestClearing.js

import Forest_Clearing from "../assets/Forest Clearing.jpg";
import { getIconById } from "../../Utils/icons";

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
      desc: "You carefully open the book and find that it's a diary. Was this diary yours? You flip to the first entry. 'Day 1: I got a diary, something only nobles and wealthy merchants can afford. It was...",
    },
    {
      id: "fc4",
      desc: "You flip the page. 'Day 2: This diary has great timing, the day after I get it, something interesting happens. The entire village was by nobles go to the Redthorn Forest and look for… something. Didn't say what that something is, but they said we'll know when we see it. We're leaving tomorrow, I better remember to bring my...",
    },
  ],

  activities: [
    // Forest Clearing 1
    {
      id: "fc1",
      name: "Look around for clues.",
      icon: getIconById("perception"),
      next: "fc2",
    },
    // Forest Clearing 2
    {
      id: "fc2",
      name: "Examine the book.",
      icon: getIconById("book"),
      next: "fc3",
    },
    // Forest Clearing 3
    {
      id: "fc3",
      branch: [
        {
          id: "fc3-1",
          name: "Won from a spar.",
          tooltip: "The black eye wasn't worth it to be honest. +1 Strength.",
          effect: [
            {
              id: "statChange",
              effect: [
                {
                  stat: "strength",
                  value: 1,
                },
              ],
            },
          ],
          icon: getIconById("strength"),
          next: "fc4",
        },
        {
          id: "fc3-2",
          name: "Stolen from the bookseller.",
          tooltip: "Old man didn't even notice. +1 Dexterity.",
          effect: [
            {
              id: "statChange",
              effect: [
                {
                  stat: "dexterity",
                  value: 1,
                },
              ],
            },
          ],
          icon: getIconById("dexterity"),
          next: "fc4",
        },
        {
          id: "fc3-3",
          name: "Gifted by father.",
          tooltip: "Wanted me to be literate he said. +1 Intelligence.",
          effect: [
            {
              id: "statChange",
              effect: [
                {
                  stat: "intelligence",
                  value: 1,
                },
              ],
            },
          ],
          icon: getIconById("intelligence"),
          next: "fc4",
        },
        {
          id: "fc3-4",
          name: "Made by me.",
          tooltip: "Paper's hard to find or make, but I managed. 1+ Perception",
          effect: [
            {
              id: "statChange",
              effect: [
                {
                  stat: "perception",
                  value: 1,
                },
              ],
            },
          ],
          icon: getIconById("perception"),
          next: "fc4",
        },
      ],
    },
    // Forest Clearing 4
    {
      id: "fc4",
      branch: [
        {
          id: "fc4-1",
          name: "Trusty Iron Sword.",
          tooltip: "Never leave home without, I always have to be prepared for a fight.",
          effect: [
            {
              id: "statChange",
              effect: [
                {
                  stat: "strength",
                  value: 1,
                },
              ],
            },
          ],
          icon: getIconById("strength"),
          next: "fc5",
        },
        {
          id: "fc4-2",
          name: "Stolen from the bookseller.",
          tooltip: "Old man didn't even notice. +1 Dexterity.",
          effect: [
            {
              id: "statChange",
              effect: [
                {
                  stat: "dexterity",
                  value: 1,
                },
              ],
            },
          ],
          icon: getIconById("dexterity"),
          next: "fc5",
        },
        {
          id: "fc4-3",
          name: "Gifted by father.",
          tooltip: "Wanted me to be literate he said. +1 Intelligence.",
          effect: [
            {
              id: "statChange",
              effect: [
                {
                  stat: "intelligence",
                  value: 1,
                },
              ],
            },
          ],
          icon: getIconById("intelligence"),
          next: "fc5",
        },
        {
          id: "fc4-4",
          name: "Made by me.",
          tooltip: "Paper's hard to find or make, but I managed. 1+ Perception",
          effect: [
            {
              id: "statChange",
              effect: [
                {
                  stat: "perception",
                  value: 1,
                },
              ],
            },
          ],
          icon: getIconById("perception"),
          next: "fc5",
        },
      ],
    },
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
