import React from "react";
import ReactDOMServer from "react-dom/server";
import { Tooltip } from "react-tooltip";
import { Icons } from "../../Utils/Data/Icons";

type CharacterPanelButtonsProps = {
  activePanel: string;
  onPanelChange: (panel: string) => void;
};

const CharacterPanelButtons: React.FC<CharacterPanelButtonsProps> = ({ activePanel, onPanelChange }) => {
  return (
    <div>
      <button
        className={`panel-button home-button ${activePanel === "home" ? "active" : ""}`}
        onClick={() => onPanelChange("home")}
        data-tooltip-id={`home-tooltip`}
        data-tooltip-html={ReactDOMServer.renderToStaticMarkup(<span>Home</span>)}
      >
        {Icons.Home}
        <Tooltip id={`home-tooltip`} className="home-tooltip" />
      </button>
      <button
        className={`panel-button equipment-button ${activePanel === "equipment" ? "active" : ""}`}
        onClick={() => onPanelChange("equipment")}
        data-tooltip-id={`equipment-tooltip`}
        data-tooltip-html={ReactDOMServer.renderToStaticMarkup(<span>Equipment</span>)}
      >
        {Icons.Sword}
        <Tooltip id={`equipment-tooltip`} className="equipment-tooltip" />
      </button>
      <button
        className={`panel-button tool-button ${activePanel === "tool" ? "active" : ""}`}
        onClick={() => onPanelChange("tools")}
        data-tooltip-id={`tool-tooltip`}
        data-tooltip-html={ReactDOMServer.renderToStaticMarkup(<span>Tools</span>)}
      >
        {Icons.Pickaxe}
        <Tooltip id={`tool-tooltip`} className="tool-tooltip" />
      </button>
      <button
        className={`panel-button stats-button ${activePanel === "stats" ? "active" : ""}`}
        onClick={() => onPanelChange("stats")}
        data-tooltip-id={`stats-tooltip`}
        data-tooltip-html={ReactDOMServer.renderToStaticMarkup(<span>Stats</span>)}
      >
        {Icons.Vitality}
        <Tooltip id={`stats-tooltip`} className="stats-tooltip" />
      </button>
      <button
        className={`panel-button skill-button ${activePanel === "skill" ? "active" : ""}`}
        onClick={() => onPanelChange("skills")}
        data-tooltip-id={`skill-tooltip`}
        data-tooltip-html={ReactDOMServer.renderToStaticMarkup(<span>Skills</span>)}
      >
        {Icons.Book}
        <Tooltip id={`skill-tooltip`} className="skill-tooltip" />
      </button>
      <button
        className={`panel-button profession-button ${activePanel === "profession" ? "active" : ""}`}
        onClick={() => onPanelChange("professions")}
        data-tooltip-id={`profession-tooltip`}
        data-tooltip-html={ReactDOMServer.renderToStaticMarkup(<span>Professions</span>)}
      >
        {Icons.XP}
        <Tooltip id={`profession-tooltip`} className="profession-tooltip" />
      </button>
    </div>
  );
};

export default CharacterPanelButtons;
