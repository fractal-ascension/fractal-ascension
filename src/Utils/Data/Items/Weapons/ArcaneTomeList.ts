import { ArcaneTome, Item, ItemType } from "../../Items";
import { EquipmentSlot } from "../../../../components/Character/characterSlice";
import { ItemId } from "../ItemId";

export const ArcaneTomeList: Item[] = [
  {
    id: ItemId.TrustyArcaneSpellbook,
    name: "Trusty Arcane Spellbook",
    description: "An Arcane spellbook you've had by your side for many years.",
    value: 10000,
    type: ItemType.WPN,
    amount: 1,
    unique: true,
    equipmentSlot: EquipmentSlot.RightWeapon,
    weapon: {
      weaponType: ArcaneTome,
      attackSpeed: 2,
      range: 10,
      rank: 3,
      quality: 1,
      damage: { minDamage: 13, maxDamage: 17 },
      critical: { criticalChance: 0.1, criticalMultiplier: 2 },
    },
  },
];
