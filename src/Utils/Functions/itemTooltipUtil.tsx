import { getStarRepresentation } from "../Data/Icons";
import { Item } from "../Data/Items";
import { ConvertToCurrency } from "./ConvertCurrencyUtil";
import nullItem from "../../assets/Background X.png";
import { Skill } from "../../components/Character/characterSlice";

export const ItemTooltipUtil = (item: Item, skill: Skill[]) => {
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
          <img src={item.img ? item.img : nullItem} alt={`${item.name}`} style={{ gridRow: "1 / span 11", gridColumn: " 1 / span 3" }} />
          <span style={{ gridColumn: "4 / span 2", paddingLeft: "10px" }}>
            <b>Damage: </b>
          </span>
          <span style={{ gridColumn: "6 / span 2", paddingLeft: "10px" }}>
            {item.weapon.damage.minDamage} - {item.weapon.damage.maxDamage}
          </span>
          <span style={{ gridColumn: "4 / span 2", paddingLeft: "10px" }}>
            <b>Atk Speed: </b>
          </span>
          <span style={{ gridColumn: "6 / span 2", paddingLeft: "10px" }}>{item.weapon.attackSpeed}s</span>
          <span style={{ gridColumn: "4 / span 2", paddingLeft: "10px" }}>
            <b>Range: </b>
          </span>
          <span style={{ gridColumn: "6 / span 2", paddingLeft: "10px" }}>{item.weapon.range}m</span>
          <span style={{ gridColumn: "4 / span 2", paddingLeft: "10px" }}>
            <b>Critical: </b>
          </span>
          <span style={{ gridColumn: "6 / span 2", paddingLeft: "10px" }}>
            {item.weapon.critical.criticalChance * 100}% ({item.weapon.critical.criticalMultiplier}
            x)
          </span>
          <span style={{ gridColumn: "4 / span 2", paddingLeft: "10px" }}>
            <b>Value: </b>
          </span>
          <span style={{ gridColumn: "6 / span 2", paddingLeft: "10px" }}>{ConvertToCurrency(item.value)}</span>
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
        <div className="item-tooltip-details">
          <img src={item.img ? item.img : nullItem} alt={`${item.name}`} style={{ gridRow: "1 / span 11", gridColumn: " 1 / span 3" }} />

          {item.tool.skillDirectBonus && item.tool.skillDirectBonus.length > 0 && (
            <>
              <span style={{ gridColumn: "4 / span 2", paddingLeft: "10px" }}>
                <b>Skill Direct Bonuses:</b>
                <br />
              </span>
              {item.tool.skillDirectBonus.map((bonus, index) => (
                <span key={index} style={{ gridColumn: "6 / span 2", paddingLeft: "10px" }}>
                  - {skill.find((skill: { id: string }) => skill.id) ? bonus.skill : "???"}: {bonus.value} (Cap: {bonus.cap})
                  <br />
                </span>
              ))}
              <br />
            </>
          )}
          {item.tool.skillMultiplierBonus && item.tool.skillMultiplierBonus.length > 0 && (
            <>
              <span style={{ gridColumn: "4 / span 2", paddingLeft: "10px" }}>
                <b>Skill Multiplier Bonuses:</b>
                <br />
              </span>
              {item.tool.skillMultiplierBonus.map((bonus, index) => (
                <span key={index} style={{ gridColumn: "6 / span 2", paddingLeft: "10px" }}>
                  - {skill.find((skill: { id: string }) => skill.id) ? bonus.skill : "???"}: {bonus.value}% (Cap: {bonus.cap})
                  <br />
                </span>
              ))}
              <br />
            </>
          )}
          {item.tool.skillLearningBonus && item.tool.skillLearningBonus.length > 0 && (
            <>
              <span style={{ gridColumn: "4 / span 2", paddingLeft: "10px" }}>
                <b>Skill Learning Bonuses:</b>
                <br />
              </span>
              {item.tool.skillLearningBonus.map((bonus, index) => (
                <span key={index} style={{ gridColumn: "6 / span 2", paddingLeft: "10px" }}>
                  - {skill.find((skill: { id: string }) => skill.id) ? bonus.skill : "???"}: {bonus.value}% (Cap: {bonus.cap})
                  <br />
                </span>
              ))}
              <br />
            </>
          )}
          {item.tool.skillRestriction && item.tool.skillRestriction.length > 0 && (
            <>
              <span style={{ gridColumn: "4 / span 2", paddingLeft: "10px" }}>
                <b>Skill Restrictions:</b>
                <br />
              </span>
              {item.tool.skillRestriction.map((restriction, index) => (
                <span key={index} style={{ gridColumn: "6 / span 2", paddingLeft: "10px" }}>
                  - {restriction.skill}: {restriction.value}
                  <br />
                </span>
              ))}
              <br />
            </>
          )}
          {item.tool.statDirectBonus && item.tool.statDirectBonus.length > 0 && (
            <>
              <span style={{ gridColumn: "4 / span 2", paddingLeft: "10px" }}>
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
              <span style={{ gridColumn: "4 / span 2", paddingLeft: "10px" }}>
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
              <span style={{ gridColumn: "4 / span 2", paddingLeft: "10px" }}>
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
