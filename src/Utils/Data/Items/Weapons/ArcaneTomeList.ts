import { ArcaneGem, ArcaneTome, Ink, Item, ItemType, Paper } from "../../Items";
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
      material: [
        { material: Paper, amount: 20 },
        { material: Ink, amount: 10 },
        { material: ArcaneGem, amount: 2 },
      ],
      rank: 3,
      quality: 1,
      damage: { minDamage: 13, maxDamage: 17 },
      critical: { criticalChance: 0.1, criticalMultiplier: 2 },
      durability: { current: 673, max: 1000 },
    },
  },
];
