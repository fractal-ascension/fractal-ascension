import Character from "../Character/Character";
import Inventory from "../Inventory/Inventory";
import Display from "../Display/Display";
import "./Main.scss";

function Main() {
  return (
    <>
      <div id="main">
        <div className="column">
          <Character />
          <Inventory />
        </div>
        <div className="column">
          <Display />
        </div>
        <div className="column">
          <div className="messages">Messages Component Placeholder</div>
        </div>
      </div>
    </>
  );
}

export default Main;
