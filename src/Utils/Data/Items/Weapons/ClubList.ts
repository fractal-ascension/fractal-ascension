import { Club, Item, ItemType, ScrapWood } from "../../Items";
import sturdyStick from "../../../../assets/SturdyStick.png";
import { EquipmentSlot } from "../../../../components/Character/characterSlice";
import { ItemId } from "../ItemId";

export const ClubList: Item[] = [
  {
    id: ItemId.SturdyStick,
    name: "Sturdy Stick",
    description: "A sturdy stick you found on the ground.",
    value: 0,
    type: ItemType.WPN,
    amount: 1,
    unique: false,
    img: sturdyStick,
    equipmentSlot: EquipmentSlot.RightWeapon,
    weapon: {
      weaponType: Club,
      attackSpeed: 2,
      range: 1,
      material: [{ material: ScrapWood, amount: 10 }], // 20% per repair (50% of base cost, can be reduced, round up)
      rank: 0,
      quality: 1,
      damage: { minDamage: 2, maxDamage: 3 },
      critical: { criticalChance: 0.01, criticalMultiplier: 1.5 },
      durability: { current: 87, max: 100 },
    },
  },
];
