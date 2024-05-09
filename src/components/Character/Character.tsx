import React from "react";
import { useSelector } from "react-redux";
import "./Character.scss";
import { RootState } from "../../store";
import CharacterName from "./CharacterName";
import { detectBrowser } from "../../Utils/browserUtil";
import { Tooltip } from "react-tooltip";
import { fullStatNames, statAbbreviations, statEffects } from "../../Interfaces/Stats";
import ReactDOMServer from "react-dom/server";

type ExtendedCSSProperties = React.CSSProperties & {
  "--bar-width"?: string;
  "--start-color"?: string;
  "--end-color"?: string;
};

const Character: React.FC = () => {
  // const dispatch = useDispatch();
  const browser = React.useMemo(() => detectBrowser(), []);
  const character = useSelector((state: RootState) => state.character);

  // Function to simulate eating poisoned food
  // const eatFood = () => {
  //   // Assuming `poisonEffect` is a valid StatusEffect object
  //   dispatch(addStatus(poisonEffect));
  // };

  const renderEquipmentSlot = (label: string, item: string | null) => {
    const isEmpty = !item;
    return (
      <div className={"equipment-slot"} key={label}>
        {isEmpty ? label : item}
      </div>
    );
  };

  const renderBar = (
    label: string,
    value: number,
    maxValue: number,
    regen: number | null,
    startColor: string,
    endColor: string
  ) => {
    const barWidth = ((maxValue - value) / maxValue) * 100;
    return (
      <div
        className="bar"
        style={
          {
            "--bar-width": `${barWidth}%`,
            "--start-color": startColor,
            "--end-color": endColor,
          } as ExtendedCSSProperties
        }
      >
        <div style={{ textAlign: "left" }}>
          <span>
            {label}: {value}/{maxValue}
          </span>
        </div>
        <div style={{ textAlign: "right" }}>
          <span>{regen ? regen + "/s" : ""}</span>
        </div>
      </div>
    );
  };

  const renderBars = () => {
    return (
      <div className="bar-grid">
        {renderBar(
          "HP",
          character.parameters.hp,
          character.parameters.maxHp,
          character.parameters.hpRegen,
          "#750000",
          "#9c0000"
        )}
        {renderBar(
          "Hunger",
          character.parameters.hunger,
          character.parameters.maxHunger,
          character.parameters.hungerRegen,
          "#750000",
          "#9c0000"
        )}
        {renderBar(
          "SP",
          character.parameters.sp,
          character.parameters.maxSp,
          character.parameters.spRegen,
          "#006600",
          "#008700"
        )}
        {renderBar(
          "Thirst",
          character.parameters.thirst,
          character.parameters.maxThirst,
          character.parameters.thirstRegen,
          "#006600",
          "#008700"
        )}
        {renderBar(
          "MP",
          character.parameters.mp,
          character.parameters.maxMp,
          character.parameters.mpRegen,
          "#000066",
          "#00008c"
        )}
        {renderBar(
          "Sleep ",
          character.parameters.sleep,
          character.parameters.maxSleep,
          character.parameters.sleepRegen,
          "#000066",
          "#00008c"
        )}
        {renderBar(
          "XP",
          character.parameters.xp,
          character.parameters.nextLevelExperience,
          null,
          "#660066",
          "#880088"
        )}
        {renderBar(
          "Energy",
          character.parameters.energy,
          character.parameters.maxEnergy,
          character.parameters.energyRegen,
          "#cc9900",
          "#e7ad00"
        )}
      </div>
    );
  };

  return (
    <div className={`character-container ${browser}`}>
      <div className="info-box">
        <div>
          <CharacterName />
          <div className="text">
            Lvl: {character.level} '{character.title}'
          </div>
        </div>
      </div>

      {renderBars()}

      <div className="stats-grid">
        {Object.entries(character.stats).map(([statName, statValue]) => {
          const abbreviation = statAbbreviations[statName as keyof typeof statAbbreviations];
          const fullName = fullStatNames[abbreviation as keyof typeof fullStatNames];

          // Define the tooltip content directly here
            const tooltipContent = (
            <div>
              <strong>{fullName}</strong>
              {statEffects
              .find((effect) => effect.id === statName)
              ?.effects.map((effect) => (
                <div key={effect}>• {effect}</div>
              ))}
            </div>
            );

          return (
            <div
              key={statName}
              className="stat-box"
              data-tooltip-id="stats-tooltip"
              data-tooltip-html={ReactDOMServer.renderToStaticMarkup(tooltipContent)}
            >
              {abbreviation}: {statValue}
            </div>
          );
        })}
        <Tooltip id="stats-tooltip" className="tooltip" />
      </div>

      {/* Display equipment */}
      <div className="equipment-grid">
        {renderEquipmentSlot("L. Hand", character.equipment.lefthand)}
        {renderEquipmentSlot("R. Hand", character.equipment.righthand)}
        {renderEquipmentSlot("Head", character.equipment.head)}
        {renderEquipmentSlot("Body", character.equipment.body)}
        {renderEquipmentSlot("Arms", character.equipment.arms)}
        {renderEquipmentSlot("Legs", character.equipment.legs)}
        {renderEquipmentSlot("Feet", character.equipment.feet)}
        {renderEquipmentSlot("Accessory", character.equipment.accessory)}
      </div>
      <span style={{ fontSize: ".7em", color: "gray" }}>Status</span>
      <div className="status-grid">
        {character.statuses?.map((status) => (
          <div key={status.id} className="status-box">
            {status.name} (Remaining:{" "}
            {status.duration > 0 ? `${status.duration} ticks` : "Permanent"})
          </div>
        ))}
      </div>
      {/* <button onClick={eatFood}>Eat Poisoned Food</button> */}
    </div>
  );
};

export default Character;
