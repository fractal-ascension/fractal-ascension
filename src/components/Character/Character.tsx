import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Character.scss";
import { RootState } from "../../store";
import CharacterName from "./CharacterName";
import { addStatus, initialState } from "./characterSlice";
import { detectBrowser } from "../../Utils/browserUtil";
import { poisonEffect } from "../../Utils/statusEffects";
import { Tooltip } from "react-tooltip";
import { Stats, fullStatNames, statAbbreviations } from "../../Interfaces/stats";
import ReactDOMServer from "react-dom/server";

type ExtendedCSSProperties = React.CSSProperties & {
  "--bar-width"?: string;
  "--start-color"?: string;
  "--end-color"?: string;
};

const Character: React.FC = () => {
  const dispatch = useDispatch();
  const browser = React.useMemo(() => detectBrowser(), []);
  const character = useSelector((state: RootState) => state.character);

  // Function to simulate eating poisoned food
  const eatFood = () => {
    // Assuming `poisonEffect` is a valid StatusEffect object
    dispatch(addStatus(poisonEffect));
  };

  const stats: Stats = {
    strength: character.stats.strength || initialState.stats.strength,
    vitality: character.stats.vitality || initialState.stats.vitality,
    agility: character.stats.agility || initialState.stats.agility,
    dexterity: character.stats.dexterity || initialState.stats.dexterity,
    intelligence: character.stats.intelligence || initialState.stats.intelligence,
    wisdom: character.stats.wisdom || initialState.stats.wisdom,
    perception: character.stats.perception || initialState.stats.perception,
    luck: character.stats.luck || initialState.stats.luck,
  };

  const hpWidth = (character.parameters.hp / character.parameters.maxHp) * 100;
  const hungerWidth = (character.parameters.hunger / character.parameters.maxHunger) * 100;
  const spWidth = (character.parameters.sp / character.parameters.maxSp) * 100;
  const thirstWidth = (character.parameters.thirst / character.parameters.maxThirst) * 100;
  const mpWidth = (character.parameters.mp / character.parameters.maxMp) * 100;
  const sleepWidth = (character.parameters.sleep / character.parameters.maxSleep) * 100;
  const energyWidth = (character.parameters.energy / character.parameters.maxEnergy) * 100;
  const xpWidth = (character.parameters.xp / character.parameters.nextLevelExperience) * 100;

  const renderEquipmentSlot = (label: string, item: string | null) => {
    const isEmpty = !item;
    return (
      <div className={"equipment-slot"} key={label}>
        {isEmpty ? label : item}
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

      <div className="bar-grid">
        <div
          className="bar"
          style={
            {
              "--bar-width": `${100 - hpWidth}%`,
              "--start-color": "#750000",
              "--end-color": "#9c0000",
            } as ExtendedCSSProperties
          }
        >
          <span>
            HP: {character.parameters.hp}/{character.parameters.maxHp}
          </span>
        </div>
        <div
          className="bar"
          style={
            {
              "--bar-width": `${100 - hungerWidth}%`,
              "--start-color": "#750000",
              "--end-color": "#9c0000",
            } as ExtendedCSSProperties
          }
        >
          <span>
            Hunger: {character.parameters.hunger}/{character.parameters.maxHunger}
          </span>
        </div>
        <div
          className="bar"
          style={
            {
              "--bar-width": `${100 - spWidth}%`,
              "--start-color": "#006600",
              "--end-color": "#008700",
            } as ExtendedCSSProperties
          }
        >
          <span>
            SP: {character.parameters.sp}/{character.parameters.maxSp}
          </span>
        </div>
        <div
          className="bar"
          style={
            {
              "--bar-width": `${100 - thirstWidth}%`,
              "--start-color": "#006600",
              "--end-color": "#008700",
            } as ExtendedCSSProperties
          }
        >
          <span>
            Thirst: {character.parameters.thirst}/{character.parameters.maxThirst}
          </span>
        </div>
        <div
          className="bar"
          style={
            {
              "--bar-width": `${100 - mpWidth}%`,
              "--start-color": "#000066",
              "--end-color": "#00008c",
            } as ExtendedCSSProperties
          }
        >
          <span>
            MP: {character.parameters.mp}/{character.parameters.maxMp}
          </span>
        </div>
        <div
          className="bar"
          style={
            {
              "--bar-width": `${100 - sleepWidth}%`,
              "--start-color": "#000066",
              "--end-color": "#00008c",
            } as ExtendedCSSProperties
          }
        >
          <span>
            Sleep: {character.parameters.sleep}/{character.parameters.maxSleep}
          </span>
        </div>
        <div
          className="bar"
          style={
            {
              "--bar-width": `${100 - xpWidth}%`,
              "--start-color": "#660066",
              "--end-color": "#880088",
            } as ExtendedCSSProperties
          }
        >
          <span>
            XP: {character.parameters.xp}/{character.parameters.nextLevelExperience}
          </span>
        </div>
        <div
          className="bar"
          style={
            {
              "--bar-width": `${100 - energyWidth}%`,
              "--start-color": "#cc9900",
              "--end-color": "#e7ad00",
            } as ExtendedCSSProperties
          }
        >
          <span>
            {/* 
              Energy is affected by Hunger, Thirst, and Sleep.
              Survival stats above 50 provide 1 energy per second per 25 points.
              Survival stats at or below 50 drains 1 energy per second per 25 points.
              Survival stats at 0 drain 3 more energy per second, maxing at -15 energy per second.
              Survival stats at or below 50 increase resistance skills for the specific stat.
              */}
            Energy: {character.parameters.energy}/{character.parameters.maxEnergy}
          </span>
        </div>
      </div>
      <div className="stats-grid">
        {Object.entries(stats).map(([statName, statValue]) => {
          const abbreviation = statAbbreviations[statName as keyof typeof statAbbreviations];
          const fullName = fullStatNames[abbreviation as keyof typeof fullStatNames];

          // Define the tooltip content directly here
          const tooltipContent = (
            <div>
              <strong>{fullName}</strong>
              <hr />- Effect 1 for {fullName}
              <br />- Effect 2 for {fullName}
              <br />- Effect 3 for {fullName}
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
            {status.name} (Remaining: {status.duration > 0 ? `${status.duration} ticks` : "Permanent"})
          </div>
        ))}
      </div>
      {/* <button onClick={eatFood}>Eat Poisoned Food</button> */}
    </div>
  );
};

export default Character;
