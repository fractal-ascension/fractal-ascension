import React, { useMemo } from "react";
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
  const browser = useMemo(() => detectBrowser(), []);
  const character = useSelector((state: RootState) => state.character);

  const renderEquipmentSlot = (label: string, item: string | null, className: string = "equipment-slot") => {
    const isEmpty = !item;
    return (
      <div className={className} key={label}>
        {isEmpty ? label : item}
      </div>
    );
  };

  const renderToolSlot = (label: string, item: string | null) => {
    const isEmpty = !item;
    return (
      <div className="tool-slot" key={label}>
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
          <span>{regen ? `${regen}/s` : ""}</span>
        </div>
      </div>
    );
  };

  const renderBars = () => {
    const bars = [
      { label: "HP", value: character.parameters.hp, maxValue: character.parameters.maxHp, regen: character.parameters.hpRegen, startColor: "#750000", endColor: "#9c0000" },
      { label: "Hunger", value: character.parameters.hunger, maxValue: character.parameters.maxHunger, regen: character.parameters.hungerRegen, startColor: "#750000", endColor: "#9c0000" },
      { label: "SP", value: character.parameters.sp, maxValue: character.parameters.maxSp, regen: character.parameters.spRegen, startColor: "#006600", endColor: "#008700" },
      { label: "Thirst", value: character.parameters.thirst, maxValue: character.parameters.maxThirst, regen: character.parameters.thirstRegen, startColor: "#006600", endColor: "#008700" },
      { label: "MP", value: character.parameters.mp, maxValue: character.parameters.maxMp, regen: character.parameters.mpRegen, startColor: "#000066", endColor: "#00008c" },
      { label: "Sleep", value: character.parameters.sleep, maxValue: character.parameters.maxSleep, regen: character.parameters.sleepRegen, startColor: "#000066", endColor: "#00008c" },
      { label: "XP", value: character.parameters.xp, maxValue: character.parameters.nextLevelExperience, regen: null, startColor: "#660066", endColor: "#880088" },
      { label: "Energy", value: character.parameters.energy, maxValue: character.parameters.maxEnergy, regen: character.parameters.energyRegen, startColor: "#cc9900", endColor: "#e7ad00" },
    ];

    return (
      <div className="bar-grid">
        {bars.map((bar, index) => (
          <React.Fragment key={index}>{renderBar(bar.label, bar.value, bar.maxValue, bar.regen, bar.startColor, bar.endColor)}</React.Fragment>
        ))}
      </div>
    );
  };

  const renderTooltipContent = (fullName: string, effects: string[]) => (
    <div>
      <strong>{fullName}</strong>
      {effects.map((effect, index) => (
        <div key={index}>• {effect}</div>
      ))}
    </div>
  );

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
            const effects = statEffects.find((effect) => effect.id === statName)?.effects || [];

            return (
              <div key={statName} className="stat-box" data-tooltip-id="stats-tooltip" data-tooltip-html={ReactDOMServer.renderToStaticMarkup(renderTooltipContent(fullName, effects))}>
                {abbreviation}: {statValue}
              </div>
            );
          })}
          <Tooltip id="stats-tooltip" className="tooltip" />
        </div>
        <span style={{ fontSize: ".7em", color: "gray" }}>Weapons</span>
        <div className="equipment-grid">
          {renderEquipmentSlot("R Weapon", character.equipment.rightWeapon, "equipment-slot-main")}
          {renderEquipmentSlot("L Weapon", character.equipment.leftWeapon, "equipment-slot-main")}
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
    const equipmentSlots = [
      { label: "Head", slot: "head" },
      { label: "Amulet", slot: "amulet" },
      { label: "Body", slot: "body" },
      { label: "L Arm", slot: "left-arm" },
      { label: "R Arm", slot: "right-arm" },
      { label: "L Ring", slot: "left-ring" },
      { label: "R Ring", slot: "right-ring" },
      { label: "L Weapon", slot: "left-weapon" },
      { label: "R Weapon", slot: "right-weapon" },
      { label: "Belt", slot: "belt" },
      { label: "L Leg", slot: "left-leg" },
      { label: "R Leg", slot: "right-leg" },
      { label: "L Foot", slot: "left-foot" },
      { label: "R Foot", slot: "right-foot" },
    ];

    return (
      <div>
        <span style={{ fontSize: ".7em", color: "gray" }}>Equipment</span>
        <div className="equipment-panel">
          <div className="equipment-silhouette">
            {equipmentSlots.map(({ label, slot }) => (
              <div key={slot} className={`equipment-slot ${slot}-slot`}>
                {renderEquipmentSlot(label, character.equipment[slot as keyof typeof character.equipment])}
              </div>
            ))}
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
            <div>{renderToolSlot("Pickaxe", character.tool.pickaxe)}</div>
            <div>{renderToolSlot("Axe", character.tool.axe)}</div>
            <div>{renderToolSlot("Sickle", character.tool.sickle)}</div>
            <div>{renderToolSlot("Shovel", character.tool.shovel)}</div>
          </div>
        </div>

        <span style={{ fontSize: ".7em", color: "gray" }}>Hunting Tools</span>
        <div className="tool-area">
          <div className="tool-grid">
            <div>{renderToolSlot("Net", character.tool.net)}</div>
            <div>{renderToolSlot("Bug Net", character.tool.bugNet)}</div>
            <div>{renderToolSlot("Fishing Rod", character.tool.fishingRod)}</div>
            <div>{renderToolSlot("Cage", character.tool.cage)}</div>
          </div>
        </div>

        <span style={{ fontSize: ".7em", color: "gray" }}>Survival Tools</span>
        <div className="tool-area">
          <div className="tool-grid">
            <div>{renderToolSlot("Manual", character.tool.manual)}</div>
            <div>{renderToolSlot("Bug Net", character.tool.bugNet)}</div>
            <div>{renderToolSlot("Fishing Rod", character.tool.fishingRod)}</div>
            <div>{renderToolSlot("Cage", character.tool.cage)}</div>
          </div>
        </div>
        <CharacterPanelButtons activePanel={activePanel} onPanelChange={onPanelChange} />
      </>
    );
  };

  const renderStatGrid = (
    title: string,
    stats: typeof character.stats | typeof character.combatStats,
    abbreviations: typeof statAbbreviations | typeof combatStatAbbreviations,
    fullNames: typeof fullStatNames | typeof fullCombatStatNames,
    iconSource: "fullName" | "abbreviation"
  ) => (
    <>
      <span style={{ fontSize: ".7em", color: "gray" }}>{title}</span>
      <div className="full-stats-grid">
        {Object.entries(stats).map(([statName, statValue]) => {
          const abbreviation = abbreviations[statName as keyof typeof abbreviations];
          const fullName = fullNames[abbreviation as keyof typeof fullNames];
          const iconKey = iconSource === "fullName" ? fullName : abbreviation;
          const icons = Icons[iconKey as keyof typeof Icons];

          const tooltipContent = renderTooltipContent(fullName, statName);

          return (
            <div key={statName} className="full-stat-box" data-tooltip-id="stats-tooltip" data-tooltip-html={ReactDOMServer.renderToStaticMarkup(tooltipContent)}>
              <span style={{ gridColumn: "1 / span 1" }}>{icons}</span>
              <span style={{ gridColumn: "2 / span 4" }}>{fullName}: </span>
              <span>{statValue}</span>
            </div>
          );
        })}
      </div>
    </>
  );

  const renderStats = () => {
    return (
      <>
        {renderStatGrid("Main Stats", character.stats, statAbbreviations, fullStatNames, "fullName")}
        {renderStatGrid("Combat Stats", character.combatStats, combatStatAbbreviations, fullCombatStatNames, "abbreviation")}
        <Tooltip id="stats-tooltip" className="tooltip" />
        <CharacterPanelButtons activePanel={activePanel} onPanelChange={onPanelChange} />
      </>
    );
  };

  const renderSkills = () => {
    // Placeholder for skills rendering
    return (
      <>
        <span style={{ fontSize: ".7em", color: "gray" }}>Skills</span>
        <div>Skills content goes here</div>
        <CharacterPanelButtons activePanel={activePanel} onPanelChange={onPanelChange} />
      </>
    );
  };

  const renderProfessions = () => {
    // Placeholder for professions rendering
    return (
      <>
        <span style={{ fontSize: ".7em", color: "gray" }}>Professions</span>
        <div>Professions content goes here</div>
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

  return <div className={`character-container ${browser}`}>{renderContent()}</div>;
};

export default Character;
