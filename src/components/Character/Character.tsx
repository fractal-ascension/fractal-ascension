import React, { useState, useRef, useEffect, RefObject } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Character.scss";
import { updateCharacterName } from "./characterSlice";
import { RootState } from "../../store";

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
          <div>
            Lvl: {character.level} '{character.title}'
          </div>
        </div>
      </div>

      <div className="bar-container">
        <div
          className="bar"
          style={{
            background: `linear-gradient(to right, ${"#ff9999"} ${hpWidth}%, ${"#b20000"} ${
              100 - hpWidth
            }%)`,
          }}
        >
          <span>
            HP: {character.stats.hp}/{character.stats.maxHp}
          </span>
        </div>
      </div>
      <div className="bar-container">
        <div
          className="bar"
          style={{
            background: `linear-gradient(to right, ${"#99ff99"} ${spWidth}%, ${"#006600"} ${
              100 - spWidth
            }%)`,
          }}
        >
          <span>
            SP: {character.stats.sp}/{character.stats.maxSp}
          </span>
        </div>
      </div>
      <div className="bar-container">
        <div
          className="bar"
          style={{
            background: `linear-gradient(to right, ${"#9999ff"} ${mpWidth}%, ${"#000066"} ${
              100 - mpWidth
            }%)`,
          }}
        >
          <span>
            MP: {character.stats.mp}/{character.stats.maxMp}
          </span>
        </div>
      </div>
      <div className="bar-container">
        <div
          className="bar"
          style={{
            background: `linear-gradient(to right, ${"#ffff99"} ${energyWidth}%, ${"#cc9900"} ${
              100 - energyWidth
            }%)`,
          }}
        >
          <span>
            Energy: {character.stats.energy}/{character.stats.maxEnergy}
          </span>
        </div>
      </div>
      <div className="bar-container">
        <div
          className="bar"
          style={{
            background: `linear-gradient(to right, ${"#cc99ff"} ${expWidth}%, ${"#660066"} ${
              100 - expWidth
            }%)`,
          }}
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

      {/* Display combat stats */}
      <div className="stats-line">
        {`Hit Chance: ${character.combat.hitChance} | Dodge Chance: ${character.combat.dodgeChance} | Critical Chance: ${character.combat.criticalChance}`}
      </div>

      {/* Display equipment */}
      <div className="equipment-grid">
        {renderEquipmentSlot("Weapon", character.equipment.weapon)}
        {renderEquipmentSlot("Shield", character.equipment.shield)}
        {renderEquipmentSlot("Head", character.equipment.head)}
        {renderEquipmentSlot("Body", character.equipment.body)}
        {renderEquipmentSlot("L. Arm", character.equipment.leftArm)}
        {renderEquipmentSlot("R. Arm", character.equipment.rightArm)}
        {renderEquipmentSlot("Legs", character.equipment.legs)}
        {renderEquipmentSlot("Accessory", character.equipment.accessory)}
        {renderEquipmentSlot("Amulet", character.equipment.amulet)}
        {renderEquipmentSlot("Cybernetic", character.equipment.cybernetic)}
      </div>
    </div>
  );
};

export default Character;
