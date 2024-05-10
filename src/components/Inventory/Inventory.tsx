import { useDispatch, useSelector } from "react-redux";
import { removeItem, setFilter, setSort, SortCriteria } from "./inventorySlice";
import { RootState } from "../../store";
import ReactDOMServer from "react-dom/server";
import "./Inventory.scss";
import { Tooltip } from "react-tooltip";
import { getStarRepresentation } from "../../Utils/icons";
import { currencyBreakdown } from "../../Interfaces/Items";

const Inventory = () => {
  const dispatch = useDispatch();
  const { items, filter, sort } = useSelector((state: RootState) => state.inventory);

  const filteredItems = filter === "ALL" ? items : items.filter((item) => item.type === filter);

  const sortedFilteredItems = [...filteredItems].sort((a, b) => {
    let sortCriteria = "NONE";
    let sortDirection: "ASC" | "DESC" = "ASC";
    if (sort !== "NONE") {
      [sortCriteria, sortDirection] = sort.split("_") as [SortCriteria, "ASC" | "DESC"];
    }

    switch (sortCriteria) {
      case "AZ":
        return sortDirection === "DESC"
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name);
      case "09":
        return sortDirection === "DESC" ? b.amount - a.amount : a.amount - b.amount;
      case "TYPE":
        return sortDirection === "DESC"
          ? b.type.localeCompare(a.type)
          : a.type.localeCompare(b.type);
      case "VAL":
        return sortDirection === "DESC" ? b.value - a.value : a.value - b.value;
      default:
        return 0;
    }
  });
  // <img src={stick} alt="Stick" width="30"/>
  const convertToCurrency = (value: number) => {
    if (value === 0) {
      return (
        <span style={{ color: "#b87333" }}>
          0<span>C</span>
        </span>
      );
    }

    return currencyBreakdown
      .map(({ divisor, symbol, color }) => {
        const amount = Math.floor(value / divisor);
        value %= divisor; // Update the remaining value to be broken down into smaller units

        // Only render the currency span if the amount is greater than 0
        if (amount > 0) {
          return (
            <span key={symbol} style={{ color: color }}>
              {amount}
              <span>{symbol} </span>
            </span>
          );
        }

        return null;
      })
      .filter(Boolean); // Filter out null entries (where amount is 0 and not displayed)
  };

  return (
    <div className="inventory-container">
      <div className="category-filter">
        <button className="category-button" onClick={() => dispatch(setFilter("ALL"))}>
          ALL
        </button>
        {/* Filter for Atk Type, Overall Damage Type, Damage Type, Weight Type */}
        <button className="category-button" onClick={() => dispatch(setFilter("WPN"))}>
          WPN
        </button>
        <button className="category-button" onClick={() => dispatch(setFilter("EQP"))}>
          EQP
        </button>
        <button className="category-button" onClick={() => dispatch(setFilter("TOOL"))}>
          TOOL
        </button>
        <button className="category-button" onClick={() => dispatch(setFilter("USE"))}>
          USE
        </button>
        <button className="category-button" onClick={() => dispatch(setFilter("CMBT"))}>
          CMBT
        </button>
        <button className="category-button" onClick={() => dispatch(setFilter("ETC"))}>
          ETC
        </button>
      </div>
      <ul className="inventory-list">
        {sortedFilteredItems.map((item, index) => (
          <li
            className="item"
            key={index}
            data-tooltip-id="item-tooltip"
            data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
              item.weapon ? (
                <div>
                  <hr />
                  <div className="item-tooltip-split">
                    <span>
                      <b>{item.name}</b>
                    </span>
                    <span>Rank: {getStarRepresentation(item.weapon?.rank)}</span>
                  </div>
                  <hr />
                  <div className="item-tooltip-split">
                    <span>Type: [{item.type}]</span>
                    <span>Class: [{item.weapon.weaponType.name}]</span>
                  </div>
                  <br />
                  <div>
                    <div className="item-tooltip-details">
                      <span>
                        <b>Damage: </b>
                      </span>
                      <span style={{ gridColumn: "2 / span 2" }}>
                        [{item.weapon.damage.minDamage} - {item.weapon.damage.maxDamage}]
                      </span>
                      <span>
                        <b>Atk Speed: </b>
                      </span>
                      <span style={{ gridColumn: "2 / span 2" }}>[{item.weapon.attackSpeed}s]</span>
                      <span>
                        <b>Range: </b>
                      </span>
                      <span style={{ gridColumn: "2 / span 2" }}>[{item.weapon.range}m]</span>
                      <span>
                        <b>Critical: </b>
                      </span>
                      <span style={{ gridColumn: "2 / span 2" }}>
                        [{item.weapon.critical.criticalChance * 100}% {" ("}
                        {item.weapon.critical.criticalMultiplier}x)]
                      </span>
                      <span>
                        <b>Durability: </b>
                      </span>
                      <span style={{ gridColumn: "2 / span 2" }}>
                        [{item.weapon.durability.current}/{item.weapon.durability.max}]
                      </span>
                      <span>
                        <b>Value: </b>
                      </span>
                      <span style={{ gridColumn: "2 / span 2" }}>
                        {convertToCurrency(item.value)}
                      </span>
                    </div>
                    <hr />
                    <span>{item.description}</span>
                  </div>
                  <hr />
                </div>
              ) : null
            )}
          >
            <span className="inventory-label">
              <span className={`item-type-label item-type-${item.type}`}>[{item.type}] </span>
              {item.name}
            </span>
            <span>x{item.amount.toLocaleString("en-US")}</span>
            <span className="delete-button-container">
              <button
                className="delete-button"
                onClick={() => dispatch(removeItem({ name: item.name, type: item.type }))}
              >
                X
              </button>
            </span>
            <Tooltip id="item-tooltip" className="item-tooltip" />
          </li>
        ))}
      </ul>
      <div className="sort-buttons">
        {/* If filter weapon, Sort for Atk Type, Overall Damage Type, Damage Type, Weight Type */}
        <button className="sort-button" onClick={() => dispatch(setSort("AZ"))}>
          A-Z
        </button>
        <button className="sort-button" onClick={() => dispatch(setSort("09"))}>
          0-9
        </button>
        <button className="sort-button" onClick={() => dispatch(setSort("TYPE"))}>
          TYPE
        </button>
      </div>
    </div>
  );
};

export default Inventory;
