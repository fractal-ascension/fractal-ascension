import { Hammer, Item, ItemType } from "../../Items";
import roundRock from "../../../../assets/RoundRock.png";
import { EquipmentSlot } from "../../../../components/Character/characterSlice";
import { ItemId } from "../ItemId";

export const HammerList: Item[] = [
  {
    id: ItemId.RoundRock,
    name: "Round Rock",
    description: "A round rock.",
    value: 0,
    type: ItemType.WPN,
    amount: 1,
    unique: false,
    img: roundRock,
    equipmentSlot: EquipmentSlot.RightWeapon,
    weapon: {
      weaponType: Hammer,
      attackSpeed: 4,
      range: 1,
      rank: 0,
      quality: 1,
      damage: { minDamage: 1, maxDamage: 6 },
      critical: { criticalChance: 0.01, criticalMultiplier: 1.5 },
    },
  },
];
