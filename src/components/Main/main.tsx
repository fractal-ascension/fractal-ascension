import Character from "../Character/Character";
import Inventory from "../Inventory/Inventory";
import "./main.scss";

function Main() {
  return (
    <>
      <div id="main">
        <Character/>
        <Inventory/>
      </div>
    </>
  );
}

export default Main;
