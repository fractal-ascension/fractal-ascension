import { Item, ItemType, Sword } from "../../Items";
import { EquipmentSlot } from "../../../../components/Character/characterSlice";
import { ItemId } from "../ItemId";

export const SwordList: Item[] = [
  {
    id: ItemId.TrustyIronSword,
    name: "Trusty Iron Sword",
    description: "A sword you've had by your side for many years.",
    value: 10000,
    type: ItemType.WPN,
    amount: 1,
    unique: true,
    equipmentSlot: EquipmentSlot.RightWeapon,
    weapon: {
      weaponType: Sword,
      attackSpeed: 2,
      range: 1,
      rank: 3,
      quality: 1,
      damage: { minDamage: 12, maxDamage: 17 },
      critical: { criticalChance: 0.05, criticalMultiplier: 2 },
    },
  },
];
