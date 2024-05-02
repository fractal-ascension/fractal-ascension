import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Character.scss";
import { RootState } from "../../store";
import CharacterName from "./CharacterName";
import { addStatus, initialState } from "./characterSlice";
import { detectBrowser } from "../../utils/browserUtil";
import { poisonEffect } from "../../utils/statusEffects";

type ExtendedCSSProperties = React.CSSProperties & {
  "--bar-width"?: string;
  "--start-color"?: string;
  "--end-color"?: string;
};

const Character = () => {
  const dispatch = useDispatch();
  const browser = React.useMemo(() => detectBrowser(), []);
  const character = useSelector((state: RootState) => state.character);

  // Function to simulate eating poisoned food
  const eatFood = () => {
    // Assuming `poisonEffect` is a valid StatusEffect object
    dispatch(addStatus(poisonEffect));
  };

  const stats = {
    STR: character.stats.strength || initialState.stats.strength,
    VIT: character.stats.vitality || initialState.stats.vitality,
    AGL: character.stats.agility || initialState.stats.agility,
    DEX: character.stats.dexterity || initialState.stats.dexterity,
    INT: character.stats.intelligence || initialState.stats.intelligence,
    WIS: character.stats.wisdom || initialState.stats.wisdom,
    SPD: character.stats.speed || initialState.stats.speed,
    LCK: character.stats.luck || initialState.stats.luck,
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
        {Object.entries(stats).map(([statName, statValue]) => (
          <div className="stat-box" key={statName}>
            {statName}: {statValue}
          </div>
        ))}
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
      <div className="status-grid">
        {character.statuses?.map((status) => (
          <div key={status.id} className="status-box">
            {status.name} (Remaining: {status.duration > 0 ? `${status.duration} ticks` : "Permanent"})
          </div>
        ))}
      </div>
    </div>
  );
};

export default Character;
