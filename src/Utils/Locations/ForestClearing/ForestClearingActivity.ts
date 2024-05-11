import { getIconById } from "../../Data/icons";
import { Activities } from "../locations";
import { ForestClearingItem } from "./ForestClearingItem";

export const ForestClearingActivity: Activities = {
  activities: [
    // Forest Clearing 1
    {
      id: "fc1",
      name: "Look around for clues.",
      icon: getIconById("perception"),
      effect: [
        {
          id: "itemChange",
          effect: [
            {
              item: ForestClearingItem.find((item) => item.id === "sturdyStick")!,
              value: 1,
            },
            {
              item: ForestClearingItem.find((item) => item.id === "roundRock")!,
              value: 1,
            },
          ],
        },
      ],
      next: "fc2",
    },
    // Forest Clearing 2
    {
      id: "fc2",
      name: "Examine the book.",
      icon: getIconById("book"),
      next: "fc3",
      previous: "fc1",
    },
    // Forest Clearing 3
    {
      id: "fc3",
      previous: "fc2",
      branch: [
        {
          id: "fc3-1",
          name: "Won from a spar.",
          tooltip: "The black eye wasn't worth it to be honest. +1 Strength.",
          icon: getIconById("strength"),
          next: "fc4",
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
        },
        {
          id: "fc3-2",
          name: "Stolen from the bookseller.",
          tooltip: "Old man didn't even notice. +1 Dexterity.",
          icon: getIconById("dexterity"),
          next: "fc4",
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
        },
        {
          id: "fc3-3",
          name: "Gifted by father.",
          tooltip: "Wanted me to be literate he said. +1 Intelligence.",
          icon: getIconById("intelligence"),
          next: "fc4",
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
        },
        {
          id: "fc3-4",
          name: "Made by me.",
          tooltip: "Paper's hard to find or make, but I managed. 1+ Perception",
          icon: getIconById("perception"),
          next: "fc4",
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
        },
      ],
    },
    // Forest Clearing 4
    {
      id: "fc4",
      previous: "fc3",
      branch: [
        {
          id: "fc4-1",
          name: "Trusty Iron Sword.",
          tooltip: "Never leave home without, I always have to be prepared for a fight.",
          icon: getIconById("sword"),
          next: "fc5",
          effect: [
            {
              id: "itemChange",
              effect: [
                {
                  item: ForestClearingItem.find((item) => item.id === "trustyIronSword")!,
                  value: 1,
                },
              ],
            },
          ],
        },
        {
          id: "fc4-2",
          name: "Trusty Ironwood Bow.",
          tooltip: "Perfect for hunting game, perfect for a forest adventure.",
          icon: getIconById("bow"),
          next: "fc5",
          effect: [
            {
              id: "itemChange",
              effect: [
                {
                  item: ForestClearingItem.find((item) => item.id === "trustyIronSword")!,
                  value: 1,
                },
              ],
            },
          ],
        },
        {
          id: "fc4-3",
          name: "Trusty Arcane Spellbook.",
          tooltip: "I still need to master Arcane Spark, might as well bring the manual.",
          icon: getIconById("book"),
          next: "fc5",
          effect: [
            {
              id: "itemChange",
              effect: [
                {
                  item: ForestClearingItem.find((item) => item.id === "trustyArcaneSpellbook")!,
                  value: 1,
                },
              ],
            },
          ],
        },
        {
          id: "fc4-4",
          name: "Trusty Forest Encyclopedia.",
          tooltip: "An encyclopedia of the forest, helps with identifying animals and plants.",
          icon: getIconById("nature"),
          next: "fc5",
          effect: [
            {
              id: "itemChange",
              effect: [
                {
                  item: ForestClearingItem.find((item) => item.id === "trustForestEncyclopedia")!,
                  value: 1,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
