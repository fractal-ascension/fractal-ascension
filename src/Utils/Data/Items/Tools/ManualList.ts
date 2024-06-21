import { Item, ItemType, Manual } from "../../Items";
import { ToolSlot } from "../../../../components/Character/characterSlice";
import { FishingSkillId } from "../../Skills/FishingSkill";
import { HuntingSkillId } from "../../Skills/HuntingSkill";
import { ForagingSkillId } from "../../Skills/ForagingSkill";
import { ItemId } from "../ItemId";

//TODO: Move to single file, randomize stats like damage, durability, add quality feature

export const ManualList: Item[] = [
  {
    id: ItemId.TrustForestEncyclopedia,
    name: "Trusty Forest Encyclopedia",
    description: "An encyclopedia you've had by your side for many years.",
    value: 10000,
    type: ItemType.TOOL,
    amount: 1,
    unique: true,
    toolSlot: ToolSlot.Manual,
    tool: {
      toolType: Manual,
      rank: 3,
      quality: 1,
      skillDirectBonus: [
        { skill: FishingSkillId.Fishing, value: 2, cap: 30 },
        { skill: HuntingSkillId.Hunting, value: 2, cap: 30 },
        { skill: ForagingSkillId.Foraging, value: 2, cap: 30 },
      ],
      skillMultiplierBonus: [
        { skill: FishingSkillId.Fishing, value: 2, cap: 30 },
        { skill: HuntingSkillId.Hunting, value: 2, cap: 30 },
        { skill: ForagingSkillId.Foraging, value: 2, cap: 30 },
      ],
    },
  },
];
