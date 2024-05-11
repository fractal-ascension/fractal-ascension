import { getIconById } from "../../Data/Icons";
import { Activities } from "../locations";

export const ForestClearingActivity: Activities = {
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
};
