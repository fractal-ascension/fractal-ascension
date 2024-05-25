import { getStarRepresentation } from "../Data/Icons";
import { Item } from "../Data/Items";
import { ConvertToCurrency } from "./ConvertCurrencyUtil";


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
          <span style={{ gridColumn: "2 / span 2" }}>{ConvertToCurrency(item.value)}</span>
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
  ) : item.tool ? (
    <div>
      <hr />
      <div className="item-tooltip-split">
        <span>
          <b>{item.name}</b>
        </span>
        <span>Rank: {getStarRepresentation(item.tool.rank)}</span>
      </div>
      <hr />
      <div className="item-tooltip-split">
        <span>Type: [{item.type}]</span>
        <span>Class: [{item.tool.toolType.name}]</span>
      </div>
      <br />
      <div>
        <div>
          {item.tool.skillDirectBonus && item.tool.skillDirectBonus.length > 0 && (
            <>
              <span>
                <b>Skill Direct Bonuses:</b>
                <br />
              </span>
              {item.tool.skillDirectBonus.map((bonus, index) => (
                <span key={index}>
                  - {bonus.skill}: {bonus.value} (Cap: {bonus.cap})
                  <br />
                </span>
              ))}
              <br />
            </>
          )}
          {item.tool.skillMultiplierBonus && item.tool.skillMultiplierBonus.length > 0 && (
            <>
              <span>
                <b>Skill Multiplier Bonuses:</b>
                <br />
              </span>
              {item.tool.skillMultiplierBonus.map((bonus, index) => (
                <span key={index}>
                  - {bonus.skill}: {bonus.value}% (Cap: {bonus.cap})
                  <br />
                </span>
              ))}
              <br />
            </>
          )}
          {item.tool.skillLearningBonus && item.tool.skillLearningBonus.length > 0 && (
            <>
              <span>
                <b>Skill Learning Bonuses:</b>
                <br />
              </span>
              {item.tool.skillLearningBonus.map((bonus, index) => (
                <span key={index}>
                  - {bonus.skill}: {bonus.value}% (Cap: {bonus.cap})
                  <br />
                </span>
              ))}
              <br />
            </>
          )}
          {item.tool.skillRestriction && item.tool.skillRestriction.length > 0 && (
            <>
              <span>
                <b>Skill Restrictions:</b>
                <br />
              </span>
              {item.tool.skillRestriction.map((restriction, index) => (
                <span key={index}>
                  - {restriction.skill}: {restriction.value}
                  <br />
                </span>
              ))}
              <br />
            </>
          )}
          {item.tool.statDirectBonus && item.tool.statDirectBonus.length > 0 && (
            <>
              <span>
                <b>Stat Direct Bonuses:</b>
                <br />
              </span>
              {item.tool.statDirectBonus.map((bonus, index) => (
                <span key={index} style={{ gridColumn: "2 / span 2" }}>
                  - {bonus.stat}: {bonus.value} (Cap: {bonus.cap})
                  <br />
                </span>
              ))}
              <br />
            </>
          )}
          {item.tool.statMultiplierBonus && item.tool.statMultiplierBonus.length > 0 && (
            <>
              <span>
                <b>Stat Multiplier Bonuses:</b>
                <br />
              </span>
              {item.tool.statMultiplierBonus.map((bonus, index) => (
                <span key={index} style={{ gridColumn: "2 / span 2" }}>
                  - {bonus.stat}: {bonus.value}% (Cap: {bonus.cap})
                  <br />
                </span>
              ))}
              <br />
            </>
          )}
          {item.tool.statRestriction && item.tool.statRestriction.length > 0 && (
            <>
              <span>
                <b>Stat Restrictions:</b>
                <br />
              </span>
              {item.tool.statRestriction.map((restriction, index) => (
                <span key={index} style={{ gridColumn: "2 / span 2" }}>
                  - {restriction.stat}: {restriction.value}
                  <br />
                </span>
              ))}
              <br />
            </>
          )}
          <span>
            <b>Durability: </b>
          </span>
          <span style={{ gridColumn: "2 / span 2" }}>
            [{item.tool.durability.current}/{item.tool.durability.max}]
          </span>
          <br />
          <span>
            <b>Value: </b>
          </span>
          <span style={{ gridColumn: "2 / span 2" }}>{ConvertToCurrency(item.value)}</span>
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
