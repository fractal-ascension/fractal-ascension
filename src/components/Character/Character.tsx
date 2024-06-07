import React from "react";
import { useSelector } from "react-redux";
import "./Character.scss";
import { RootState } from "../../store";
import CharacterName from "./CharacterName";
import { detectBrowser } from "../../Utils/Functions/browserUtil";
import { Tooltip } from "react-tooltip";
import { combatStatAbbreviations, fullCombatStatNames, fullStatNames, statAbbreviations, statEffects } from "../../Utils/Data/Stats";
import ReactDOMServer from "react-dom/server";
import { Icons } from "../../Utils/Data/Icons";
import CharacterPanelButtons from "./CharacterPanelButtons";

type ExtendedCSSProperties = React.CSSProperties & {
  "--bar-width"?: string;
  "--start-color"?: string;
  "--end-color"?: string;
};

type CharacterProps = {
  activePanel: string;
  onPanelChange: (panel: string) => void;
};

const Character: React.FC<CharacterProps> = ({ activePanel, onPanelChange }) => {
  const browser = React.useMemo(() => detectBrowser(), []);
  const character = useSelector((state: RootState) => state.character);

  const renderEquipmentSlotMain = (label: string, item: string | null) => {
    const isEmpty = !item;
    return (
      <div className={"equipment-slot-main"} key={label}>
        {isEmpty ? label : item}
      </div>
    );
  };

  const renderEquipmentSlot = (label: string, item: string | null) => {
    const isEmpty = !item;
    return (
      <div className={"equipment-slot"} key={label}>
        {isEmpty ? label : item}
      </div>
    );
  };

  const renderToolSlot = (label: string, item: string | null) => {
    const isEmpty = !item;
    return (
      <div className={"tool-slot"} key={label}>
        {isEmpty ? label : item}
      </div>
    );
  };

  const renderBar = (label: string, value: number, maxValue: number, regen: number | null, startColor: string, endColor: string) => {
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
        {renderBar("HP", character.parameters.hp, character.parameters.maxHp, character.parameters.hpRegen, "#750000", "#9c0000")}
        {renderBar("Hunger", character.parameters.hunger, character.parameters.maxHunger, character.parameters.hungerRegen, "#750000", "#9c0000")}
        {renderBar("SP", character.parameters.sp, character.parameters.maxSp, character.parameters.spRegen, "#006600", "#008700")}
        {renderBar("Thirst", character.parameters.thirst, character.parameters.maxThirst, character.parameters.thirstRegen, "#006600", "#008700")}
        {renderBar("MP", character.parameters.mp, character.parameters.maxMp, character.parameters.mpRegen, "#000066", "#00008c")}
        {renderBar("Sleep ", character.parameters.sleep, character.parameters.maxSleep, character.parameters.sleepRegen, "#000066", "#00008c")}
        {renderBar("XP", character.parameters.xp, character.parameters.nextLevelExperience, null, "#660066", "#880088")}
        {renderBar("Energy", character.parameters.energy, character.parameters.maxEnergy, character.parameters.energyRegen, "#cc9900", "#e7ad00")}
      </div>
    );
  };

  const renderHome = () => {
    return (
      <>
        <span style={{ fontSize: ".7em", color: "gray" }}>Character</span>
        <div className="info-box">
          <div>
            <CharacterName />
            <div className="text">
              Lvl: {character.level} '{character.title}'
            </div>
          </div>
        </div>

        {renderBars()}
        <span style={{ fontSize: ".7em", color: "gray" }}>Stats</span>
        <div className="stats-grid">
          {Object.entries(character.stats).map(([statName, statValue]) => {
            const abbreviation = statAbbreviations[statName as keyof typeof statAbbreviations];
            const fullName = fullStatNames[abbreviation as keyof typeof fullStatNames];

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
              <div key={statName} className="stat-box" data-tooltip-id="stats-tooltip" data-tooltip-html={ReactDOMServer.renderToStaticMarkup(tooltipContent)}>
                {abbreviation}: {statValue}
              </div>
            );
          })}
          <Tooltip id="stats-tooltip" className="tooltip" />
        </div>
        <span style={{ fontSize: ".7em", color: "gray" }}>Weapons</span>
        <div className="equipment-grid">
          {renderEquipmentSlotMain("R Weapon", character.equipment.rightWeapon)}
          {renderEquipmentSlotMain("L Weapon", character.equipment.leftWeapon)}
        </div>
        <span style={{ fontSize: ".7em", color: "gray" }}>Status</span>
        <div className="status-grid">
          {character.statuses?.map((status) => (
            <div
              key={status.id}
              className="status-box"
              data-tooltip-id={`status-tooltip-${status.id}`}
              data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                <span style={{ fontSize: "0.8em" }}>
                  {status.description}
                  <br />
                  {status.effectDescription.map((desc, index) => (
                    <span key={index}>
                      • {desc}
                      <br />
                    </span>
                  ))}
                </span>
              )}
            >
              <div className="status-content">
                <span className="status-text">
                  {Icons.Skull}
                  <br /> {status.name}
                </span>
              </div>
              <div className="status-duration">{status.duration > 0 ? `${status.duration} ticks` : "Permanent"}</div>
              <Tooltip id={`status-tooltip-${status.id}`} className="status-tooltip" />
            </div>
          ))}
        </div>
        <CharacterPanelButtons activePanel={activePanel} onPanelChange={onPanelChange} />
      </>
    );
  };

  const renderEquipment = () => {
    return (
      <div>
        <span style={{ fontSize: ".7em", color: "gray" }}>Equipment</span>
        <div className="equipment-panel">
          <div className="equipment-silhouette">
            <div className="equipment-slot head-slot">{renderEquipmentSlot("Head", character.equipment.head)}</div>
            <div className="equipment-slot amulet-slot">{renderEquipmentSlot("Amulet", character.equipment.amulet)}</div>
            <div className="equipment-slot body-slot">{renderEquipmentSlot("Body", character.equipment.body)}</div>
            <div className="equipment-slot left-arm-slot">{renderEquipmentSlot("L Arm", character.equipment.leftArm)}</div>
            <div className="equipment-slot right-arm-slot">{renderEquipmentSlot("R Arm", character.equipment.rightArm)}</div>
            <div className="equipment-slot left-ring-slot">{renderEquipmentSlot("L Ring", character.equipment.leftRing)}</div>
            <div className="equipment-slot right-ring-slot">{renderEquipmentSlot("R Ring", character.equipment.rightRing)}</div>
            <div className="equipment-slot left-weapon-slot">{renderEquipmentSlot("L Weapon", character.equipment.leftWeapon)}</div>
            <div className="equipment-slot right-weapon-slot">{renderEquipmentSlot("R Weapon", character.equipment.rightWeapon)}</div>
            <div className="equipment-slot belt-slot">{renderEquipmentSlot("Belt", character.equipment.belt)}</div>
            <div className="equipment-slot left-leg-slot">{renderEquipmentSlot("L Leg", character.equipment.leftLeg)}</div>
            <div className="equipment-slot right-leg-slot">{renderEquipmentSlot("R Leg", character.equipment.rightLeg)}</div>
            <div className="equipment-slot left-foot-slot">{renderEquipmentSlot("L Foot", character.equipment.leftFoot)}</div>
            <div className="equipment-slot right-foot-slot">{renderEquipmentSlot("R Foot", character.equipment.rightFoot)}</div>
          </div>
          <div>
            <span style={{ fontSize: ".7em" }}>Equipment Effects</span>
            <hr style={{ margin: "0px", width: "96%" }} />
            <div className="equipment-effects">
              <li>None</li>
            </div>
          </div>
        </div>
        <CharacterPanelButtons activePanel={activePanel} onPanelChange={onPanelChange} />
      </div>
    );
  };

  const renderTools = () => {
    return (
      <>
        <span style={{ fontSize: ".7em", color: "gray" }}>Harvesting Tools</span>
        <div className="tool-area">
          <div className="tool-grid">
            <div>{renderToolSlot("Pickaxe", character.equipment.head)}</div>
            <div>{renderToolSlot("Axe", character.equipment.head)}</div>
            <div>{renderToolSlot("Sickle", character.equipment.head)}</div>
            <div>{renderToolSlot("Shovel", character.equipment.head)}</div>
          </div>
        </div>

        <span style={{ fontSize: ".7em", color: "gray" }}>Hunting Tools</span>
        <div className="tool-area">
          <div className="tool-grid">
            <div>{renderToolSlot("Net", character.equipment.head)}</div>
            <div>{renderToolSlot("Bug Net", character.equipment.head)}</div>
            <div>{renderToolSlot("Fishing Rod", character.equipment.head)}</div>
            <div>{renderToolSlot("Cage", character.equipment.head)}</div>
          </div>
        </div>

        <span style={{ fontSize: ".7em", color: "gray" }}>Survival Tools</span>
        <div className="tool-area">
          <div className="tool-grid">
            <div>{renderToolSlot("Manual", character.equipment.head)}</div>
            <div>{renderToolSlot("Bug Net", character.equipment.head)}</div>
            <div>{renderToolSlot("Fishing Rod", character.equipment.head)}</div>
            <div>{renderToolSlot("Cage", character.equipment.head)}</div>
          </div>
        </div>
        <CharacterPanelButtons activePanel={activePanel} onPanelChange={onPanelChange} />
      </>
    );
  };

  const renderStats = () => {
    return (
      <>
        <span style={{ fontSize: ".7em", color: "gray" }}>Main Stats</span>
        <div className="full-stats-grid">
          {Object.entries(character.stats).map(([statName, statValue]) => {
            const abbreviation = statAbbreviations[statName as keyof typeof statAbbreviations];
            const fullName = fullStatNames[abbreviation as keyof typeof fullStatNames];
            const icons = Icons[fullName as keyof typeof Icons];

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
              <div key={statName} className="full-stat-box" data-tooltip-id="stats-tooltip" data-tooltip-html={ReactDOMServer.renderToStaticMarkup(tooltipContent)}>
                <span style={{ gridColumn: "1 / span 1" }}>{icons}</span>
                <span style={{ gridColumn: "2 / span 4" }}>{fullName}: </span>
                <span>{statValue}</span>
              </div>
            );
          })}
          <Tooltip id="stats-tooltip" className="tooltip" />
        </div>
        <span style={{ fontSize: ".7em", color: "gray" }}>Combat Stats</span>
        <div className="full-stats-grid">
          {Object.entries(character.combatStats).map(([statName, statValue]) => {
            const abbreviation = combatStatAbbreviations[statName as keyof typeof combatStatAbbreviations];
            const fullName = fullCombatStatNames[abbreviation as keyof typeof fullCombatStatNames];
            const icons = Icons[abbreviation as keyof typeof Icons];

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
              <div key={statName} className="full-stat-box" data-tooltip-id="stats-tooltip" data-tooltip-html={ReactDOMServer.renderToStaticMarkup(tooltipContent)}>
                <span style={{ gridColumn: "1 / span 1" }}>{icons}</span>
                <span style={{ gridColumn: "2 / span 4" }}>{fullName}: </span>
                <span>{statValue}</span>
              </div>
            );
          })}
          <Tooltip id="stats-tooltip" className="tooltip" />
        </div>
        <CharacterPanelButtons activePanel={activePanel} onPanelChange={onPanelChange} />
      </>
    );
  };

  const renderSkills = () => {
    return (
      <>
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
              <div key={statName} className="stat-box" data-tooltip-id="stats-tooltip" data-tooltip-html={ReactDOMServer.renderToStaticMarkup(tooltipContent)}>
                {abbreviation}: {statValue}
              </div>
            );
          })}
          <Tooltip id="stats-tooltip" className="tooltip" />
        </div>
        <CharacterPanelButtons activePanel={activePanel} onPanelChange={onPanelChange} />
      </>
    );
  };

  const renderProfessions = () => {
    return (
      <>
        <div className="equipment-panel">
          <div className="equipment-silhouette">
            <div className="equipment-slot head-slot">{renderEquipmentSlot("Head", character.equipment.head)}</div>
            <div className="equipment-slot amulet-slot">{renderEquipmentSlot("Amulet", character.equipment.amulet)}</div>
            <div className="equipment-slot body-slot">{renderEquipmentSlot("Body", character.equipment.body)}</div>
            <div className="equipment-slot left-arm-slot">{renderEquipmentSlot("L Arm", character.equipment.leftArm)}</div>
            <div className="equipment-slot right-arm-slot">{renderEquipmentSlot("R Arm", character.equipment.rightArm)}</div>
            <div className="equipment-slot left-ring-slot">{renderEquipmentSlot("L Ring", character.equipment.leftRing)}</div>
            <div className="equipment-slot right-ring-slot">{renderEquipmentSlot("R Ring", character.equipment.rightRing)}</div>
            <div className="equipment-slot left-weapon-slot">{renderEquipmentSlot("L Weapon", character.equipment.leftWeapon)}</div>
            <div className="equipment-slot right-weapon-slot">{renderEquipmentSlot("R Weapon", character.equipment.rightWeapon)}</div>
            <div className="equipment-slot belt-slot">{renderEquipmentSlot("Belt", character.equipment.belt)}</div>
            <div className="equipment-slot left-leg-slot">{renderEquipmentSlot("L Leg", character.equipment.leftLeg)}</div>
            <div className="equipment-slot right-leg-slot">{renderEquipmentSlot("R Leg", character.equipment.rightLeg)}</div>
            <div className="equipment-slot left-foot-slot">{renderEquipmentSlot("L Foot", character.equipment.leftFoot)}</div>
            <div className="equipment-slot right-foot-slot">{renderEquipmentSlot("R Foot", character.equipment.rightFoot)}</div>
          </div>
          <div>test</div>
        </div>
        <CharacterPanelButtons activePanel={activePanel} onPanelChange={onPanelChange} />
      </>
    );
  };

  const renderContent = () => {
    switch (activePanel) {
      case "home":
        return renderHome();
      case "equipment":
        return renderEquipment();
      case "tools":
        return renderTools();
      case "stats":
        return renderStats();
      case "skills":
        return renderSkills();
      case "professions":
        return renderProfessions();
      default:
        return renderHome();
    }
  };

  return (
    <>
      {/* Move buttons out to App.tsx so I can also change the other panels */}
      <div className={`character-container ${browser}`}>{renderContent()}</div>
    </>
  );
};

export default Character;
