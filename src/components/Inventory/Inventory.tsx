import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSort, SortCriteria } from "./inventorySlice";
import { RootState } from "../../store";
import "./Inventory.scss";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // default styles

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
        return sortDirection === "DESC" ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
      case "09":
        return sortDirection === "DESC" ? b.amount - a.amount : a.amount - b.amount;
      case "TYPE":
        return sortDirection === "DESC" ? b.type.localeCompare(a.type) : a.type.localeCompare(b.type);
      case "VAL":
        return sortDirection === "DESC" ? b.value - a.value : a.value - b.value;
      default:
        return 0;
    }
  });

  interface Currency {
    symbol: string;
    value: string;
    color: string;
    fullName: string; // Added full name of the currency
  }

  function convertToCurrency(value: number): Currency[] {
    if (value === 0)
      return [
        {
          value: "0",
          color: "#b87333",
          fullName: "Copper",
          symbol: `C`,
        },
      ];

    // Convert the value to an array of Currency objects for all denominations
    const currencyBreakdown = [
      { divisor: 100000000000000, symbol: "F", fullName: "Fractal", color: "#c50101" },
      { divisor: 1000000000000, symbol: "E", fullName: "Essence", color: "#fff2b9" },
      { divisor: 10000000000, symbol: "M", fullName: "Mythril", color: "#bcb9ff" },
      { divisor: 100000000, symbol: "D", fullName: "Diamond", color: "#b9f2ff" },
      { divisor: 1000000, symbol: "P", fullName: "Platinum", color: "#e5e4e2" },
      { divisor: 10000, symbol: "G", fullName: "Gold", color: "#ffd700" },
      { divisor: 100, symbol: "S", fullName: "Silver", color: "#c0c0c0" },
      { divisor: 1, symbol: "C", fullName: "Copper", color: "#b87333" },
    ];

    return currencyBreakdown
      .map(({ divisor, symbol, fullName, color }) => {
        const amount = Math.floor((value % (divisor * 100)) / divisor);
        return {
          value: `${amount}`,
          symbol,
          color,
          fullName,
        };
      })
      .filter(({ value }) => value !== "0"); // Only include currencies with a non-zero amount
  }

  // Tooltip content component
  const TooltipContent = ({ currencyComponents }: { currencyComponents: Currency[] }) => (
    <div>
      {currencyComponents.map((cc, index) => (
        <div key={index} style={{ color: cc.color, fontSize: '18px', }}>
          {cc.value}
          {cc.symbol} ({cc.fullName})
        </div>
      ))}
    </div>
  );

  function CurrencyDisplay({ value }: { value: number }) {
    const currencyComponents = convertToCurrency(value);

    return (
      <>
        {currencyComponents.slice(0, 3).map((currency, index) => (
          <Tippy
            key={index}
            content={<TooltipContent currencyComponents={currencyComponents} />}
            delay={[200, 0]} // Adjust as needed. First value is show delay, second value is hide delay.
            animation="scale"
            interactive={true} // Allows interaction with the tooltip content
            allowHTML={true} // Allow HTML rendering inside tooltip
          >
            <span style={{ color: currency.color, marginRight: "2.5px", marginLeft: "2.5px" }}>
              {currency.value}
              <span>{currency.symbol}</span>
            </span>
          </Tippy>
        ))}
      </>
    );
  }

  return (
    <div className="inventory-container">
      <div className="category-filter">
        <button className="category-button" onClick={() => dispatch(setFilter("ALL"))}>
          ALL
        </button>
        <button className="category-button" onClick={() => dispatch(setFilter("WPN"))}>
          WPN
        </button>
        <button className="category-button" onClick={() => dispatch(setFilter("EQP"))}>
          EQP
        </button>
        <button className="category-button" onClick={() => dispatch(setFilter("USE"))}>
          USE
        </button>
        <button className="category-button" onClick={() => dispatch(setFilter("OTHER"))}>
          OTHER
        </button>
      </div>
      <ul className="inventory-list">
        {sortedFilteredItems.map((item, index) => (
          <li className="item" key={index}>
            <span>
              [{item.type}] {item.name}
            </span>
            <span>
              ({CurrencyDisplay({ value: item.value })}) x{item.amount}
            </span>
          </li>
        ))}
      </ul>
      <div className="sort-buttons">
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
