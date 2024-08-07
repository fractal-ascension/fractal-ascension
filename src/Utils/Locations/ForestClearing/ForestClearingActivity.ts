import { Icons } from "../../Data/Icons";
import { ItemId } from "../../Data/Items/ItemId";
import { ItemList } from "../../Data/Items/ItemList";
import { Activities, ActivityTypes } from "../../Data/Locations";

export const ForestClearingActivity: Activities = {
  activities: [
    // Forest Clearing 1
    {
      id: "fc1",
      name: "Look around for clues.",
      icon: Icons.Perception,
      effect: [
        {
          id: ActivityTypes.ItemChange,
          effect: [
            {
              item: ItemList.find((item) => item.id === ItemId.SturdyStick)!,
              value: 1,
            },
            {
              item: ItemList.find((item) => item.id === ItemId.RoundRock)!,
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
      icon: Icons.Book,
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
          tooltip: "The black eye wasn't worth it to be honest.",
          icon: Icons.Strength,
          next: "fc4",
          effect: [
            {
              id: ActivityTypes.StatChange,
              effect: [
                {
                  stat: "strength",
                  value: +1,
                },
              ],
            },
          ],
        },
        {
          id: "fc3-2",
          name: "Stolen from the bookseller.",
          tooltip: "Old man didn't even notice.",
          icon: Icons.Dexterity,
          next: "fc4",
          effect: [
            {
              id: ActivityTypes.StatChange,
              effect: [
                {
                  stat: "vitality",
                  value: 1,
                },
              ],
            },
          ],
        },
        {
          id: "fc3-3",
          name: "Gifted by father.",
          tooltip: "Wanted me to be literate he said.",
          icon: Icons.Intelligence,
          next: "fc4",
          effect: [
            {
              id: ActivityTypes.StatChange,
              effect: [
                {
                  stat: "intelligence",
                  value: +1,
                },
              ],
            },
          ],
        },
        {
          id: "fc3-4",
          name: "Made by me.",
          tooltip: "Paper's hard to find or make, but I managed.",
          icon: Icons.Perception,
          next: "fc4",
          effect: [
            {
              id: ActivityTypes.StatChange,
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
          tooltip: "Never leave home without, have to be prepared for a fight.",
          icon: Icons.Sword,
          next: "fc5",
          effect: [
            {
              id: ActivityTypes.ItemChange,
              effect: [
                {
                  item: ItemList.find((item) => item.id === ItemId.TrustyIronSword)!,
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
          icon: Icons.Bow,
          next: "fc5",
          effect: [
            {
              id: ActivityTypes.ItemChange,
              effect: [
                {
                  item: ItemList.find((item) => item.id === ItemId.TrustyIronwoodBow)!,
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
          icon: Icons.Book,
          next: "fc5",
          effect: [
            {
              id: ActivityTypes.ItemChange,
              effect: [
                {
                  item: ItemList.find((item) => item.id === ItemId.TrustyArcaneSpellbook)!,
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
          icon: Icons.Nature,
          next: "fc5",
          effect: [
            {
              id: ActivityTypes.ItemChange,
              effect: [
                {
                  item: ItemList.find((item) => item.id === ItemId.TrustForestEncyclopedia)!,
                  value: 1,
                },
              ],
            },
          ],
        },
      ],
    },
    // Forest Clearing 5
    {
      id: "fc5",
      previous: "fc4",
      branch: [
        {
          id: "fc5-1",
          name: "Knight.",
          tooltip: "He gave me tips on how to hit hard and hit harder.",
          icon: Icons.Sword,
          next: "fc6",
          effect: [
            {
              id: ActivityTypes.ItemChange,
              effect: [
                {
                  item: ItemList.find((item) => item.id === ItemId.TrustyIronSword)!,
                  value: 1,
                },
              ],
            },
          ],
        },
        {
          id: "fc5-2",
          name: "Hunter.",
          tooltip: "She gave me tips on how to hit things accurately from afar.",
          icon: Icons.Bow,
          next: "fc6",
          effect: [
            {
              id: ActivityTypes.ItemChange,
              effect: [
                {
                  item: ItemList.find((item) => item.id === ItemId.TrustyIronwoodBow)!,
                  value: 1,
                },
              ],
            },
          ],
        },
        {
          id: "fc5-3",
          name: "Wizard.",
          tooltip: "She gave me tips on me how to focus mana.",
          icon: Icons.Book,
          next: "fc6",
          effect: [
            {
              id: ActivityTypes.ItemChange,
              effect: [
                {
                  item: ItemList.find((item) => item.id === ItemId.TrustyArcaneSpellbook)!,
                  value: 1,
                },
              ],
            },
          ],
        },
        {
          id: "fc5-4",
          name: "Wanderer.",
          tooltip: "Taught me how to survive in the wilds.",
          icon: Icons.Nature,
          next: "fc6",
          effect: [
            {
              id: ActivityTypes.ItemChange,
              effect: [
                {
                  item: ItemList.find((item) => item.id === ItemId.TrustForestEncyclopedia)!,
                  value: 1,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "fc6",
      name: "Look for the latest entry.",
      icon: Icons.Book,
      next: "fc7",
      previous: "fc5",
    },
    {
      id: "fc7",
      name: "Put down the book.",
      icon: Icons.Book,
      next: "fc8",
      previous: "fc6",
    },
  ],
};
