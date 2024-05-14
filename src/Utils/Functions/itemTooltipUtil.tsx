import { getStarRepresentation } from "../Data/Icons";
import { Item } from "../Data/Items";
import { convertToCurrency } from "./convertCurrencyUtil";

export const ItemTooltipUtil = (item: Item) => {
  return item.weapon ? (
    <div>
      <hr />
      <div className="item-tooltip-split">
        <span>
          <b>{item.name}</b>
        </span>
        <span>Rank: {getStarRepresentation(item.weapon.rank)}</span>
      </div>
      <hr />
      <div className="item-tooltip-split">
        <span>Type: [{item.type}]</span>
        <span>Class: [{item.weapon.weaponType.name}]</span>
      </div>
      <br />
      <div>
        <div className="item-tooltip-details">
          <span>
            <b>Damage: </b>
          </span>
          <span style={{ gridColumn: "2 / span 2" }}>
            [{item.weapon.damage.minDamage} - {item.weapon.damage.maxDamage}]
          </span>
          <span>
            <b>Atk Speed: </b>
          </span>
          <span style={{ gridColumn: "2 / span 2" }}>[{item.weapon.attackSpeed}s]</span>
          <span>
            <b>Range: </b>
          </span>
          <span style={{ gridColumn: "2 / span 2" }}>[{item.weapon.range}m]</span>
          <span>
            <b>Critical: </b>
          </span>
          <span style={{ gridColumn: "2 / span 2" }}>
            [{item.weapon.critical.criticalChance * 100}% ({item.weapon.critical.criticalMultiplier}
            x)]
          </span>
          <span>
            <b>Durability: </b>
          </span>
          <span style={{ gridColumn: "2 / span 2" }}>
            [{item.weapon.durability.current}/{item.weapon.durability.max}]
          </span>
          <span>
            <b>Value: </b>
          </span>
          <span style={{ gridColumn: "2 / span 2" }}>{convertToCurrency(item.value)}</span>
        </div>
        <hr />
        <span>{item.description}</span>
        {item.unique ? (
          <span>
            <hr />
            <span style={{ color: "orange" }}>Unique</span>
          </span>
        ) : null}
      </div>
      <hr />
    </div>
  ) : null;
};
