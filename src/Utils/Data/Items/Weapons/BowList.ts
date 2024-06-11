import { Bow, IronWood, Item, ItemType } from "../../Items";
import { EquipmentSlot } from "../../../../components/Character/characterSlice";
import { ItemId } from "../ItemId";

export const BowList: Item[] = [
  {
    id: ItemId.TrustyIronwoodBow,
    name: "Trusty Ironwood Bow",
    description: "A bow you've had by your side for many years.",
    value: 10000,
    type: ItemType.WPN,
    amount: 1,
    unique: true,
    equipmentSlot: EquipmentSlot.RightWeapon,
    weapon: {
      weaponType: Bow,
      attackSpeed: 3,
      range: 20,
      material: [{ material: IronWood, amount: 20 }],
      rank: 3,
      quality: 1,
      damage: { minDamage: 15, maxDamage: 21 },
      critical: { criticalChance: 0.05, criticalMultiplier: 2 },
      durability: { current: 425, max: 1000 },
    },
  },
];
