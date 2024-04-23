import React, { useState, useRef, useEffect, RefObject } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Character.scss";
import { updateCharacterName } from "./characterSlice";
import { RootState } from "../../store";

type ExtendedCSSProperties = React.CSSProperties & {
  "--bar-width"?: string;
  "--start-color"?: string;
  "--end-color"?: string;
};

const Character = () => {
  const character = useSelector((state: RootState) => state.character);
  const dispatch = useDispatch();
  const [name, setName] = useState(character.name);
  const nameRef: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    if (nameRef.current && nameRef.current.textContent !== name) {
      nameRef.current.textContent = name;
    }
  }, [name]);

  const handleBlur = () => {
    const newName = nameRef.current?.textContent || "";
    if (newName !== character.name) {
      dispatch(updateCharacterName(newName));
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      nameRef.current?.blur();
    } else if (event.key === "Escape") {
      event.preventDefault();
      setName(character.name);
      nameRef.current?.blur();
    }
  };

  const handleNameEdit = (e: React.FormEvent<HTMLDivElement>) => {
    setName(e.currentTarget.textContent || "");
  };

  const stats = {
    STR: character.stats.strength || 1,
    VIT: character.stats.vitality || 1,
    AGL: character.stats.agility || 1,
    DEX: character.stats.dexterity || 1,
    INT: character.stats.intelligence || 1,
    WIS: character.stats.wisdom || 1,
    SPD: character.stats.speed || 1,
    LCK: character.stats.luck || 1,
  };

  const hpWidth = (character.stats.hp / character.stats.maxHp) * 100;
  const spWidth = (character.stats.sp / character.stats.maxSp) * 100;
  const mpWidth = (character.stats.mp / character.stats.maxMp) * 100;
  const energyWidth = character.stats.energy
    ? (character.stats.energy / character.stats.maxEnergy) * 100
    : 0;
  const expWidth =
    (character.stats.experience / character.stats.nextLevelExperience) * 100;

  const renderEquipmentSlot = (label: string, item: string | null) => {
    const isLocked = item === "// LOCKED //";
    const isEmpty = !item || isLocked;
    return (
      <div
        className={`equipment-slot ${isEmpty ? "empty" : ""} ${
          isLocked ? "locked" : ""
        }`}
        key={label}
      >
        {isEmpty ? (isLocked ? item : label) : item}
      </div>
    );
  };

  return (
    <div className="character-container">
      <div className="info-box">
        <div>
          <div
            className="editable-text"
            ref={nameRef}
            contentEditable={true}
            onBlur={handleBlur}
            onInput={handleNameEdit}
            onKeyDown={handleKeyDown}
            suppressContentEditableWarning={true}
            spellCheck={false}
          >
            {character.name || "You"}
          </div>
          <div className="text">
            Lvl: {character.level} '{character.title}'
          </div>
        </div>
      </div>

      <div className="bar-container">
        <div
          className="bar"
          style={
            {
              "--bar-width": `${100 - hpWidth}%`,
              "--start-color": "#750000",
              "--end-color": "#ff4444",
            } as ExtendedCSSProperties
          }
        >
          <span>
            HP: {character.stats.hp}/{character.stats.maxHp}
          </span>
        </div>
      </div>

      <div className="bar-container">
        <div
          className="bar"
          style={
            {
              "--bar-width": `${100 - spWidth}%`,
              "--start-color": "#006600",
              "--end-color": "#99ff99",
            } as ExtendedCSSProperties
          }
        >
          <span>
            SP: {character.stats.sp}/{character.stats.maxSp}
          </span>
        </div>
      </div>
      <div className="bar-container">
        <div
          className="bar"
          style={
            {
              "--bar-width": `${100 - mpWidth}%`,
              "--start-color": "#000066",
              "--end-color": "#9999ff",
            } as ExtendedCSSProperties
          }
        >
          <span>
            MP: {character.stats.mp}/{character.stats.maxMp}
          </span>
        </div>
      </div>
      <div className="bar-container">
        <div
          className="bar"
          style={
            {
              "--bar-width": `${100 - energyWidth}%`,
              "--start-color": "#cc9900",
              "--end-color": "#ffff53",
            } as ExtendedCSSProperties
          }
        >
          <span>
            Energy: {character.stats.energy}/{character.stats.maxEnergy}
          </span>
        </div>
      </div>
      <div className="bar-container">
        <div
          className="bar"
          style={
            {
              "--bar-width": `${100 - expWidth}%`,
              "--start-color": "#660066",
              "--end-color": "#cc99ff",
            } as ExtendedCSSProperties
          }
        >
          <span>
            EXP: {character.stats.experience}/
            {character.stats.nextLevelExperience}
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
        {renderEquipmentSlot("Weapon", character.equipment.weapon)}
        {renderEquipmentSlot("Shield", character.equipment.shield)}
        {renderEquipmentSlot("Head", character.equipment.head)}
        {renderEquipmentSlot("Body", character.equipment.body)}
        {renderEquipmentSlot("Arms", character.equipment.arms)}
        {renderEquipmentSlot("Legs", character.equipment.legs)}
        {renderEquipmentSlot("Feet", character.equipment.feet)}
        {renderEquipmentSlot("Accessory", character.equipment.accessory)}
        {renderEquipmentSlot("Amulet", character.equipment.amulet)}
        {renderEquipmentSlot("Cybernetic", character.equipment.cybernetic)}
      </div>
    </div>
  );
};

export default Character;
