import Character from "../Character/Character";
import Inventory from "../Inventory/Inventory";
import "./main.scss";

function Main() {
  return (
    <>
      <div id="main">
        <div className="column">
          <Character />
          <Inventory />
        </div>
        <div className="column">
          <div className="combat">Combat Component Placeholder</div>
          <div className="actions">Actions Component Placeholder</div>
        </div>
        <div className="column">
          <div className="messages">Messages Component Placeholder</div>
        </div>
      </div>
    </>
  );
}

export default Main;
