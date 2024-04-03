import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSort, SortCriteria } from "./inventorySlice";
import { RootState } from "../../store";
import "./Inventory.scss";

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

  interface Currency {
    value: string;
    color: string;
    fullName: string; // Added full name of the currency
  }

  function convertToCurrency(value: number): Currency[] {
    if (value === 0)
      return [
        {
          value: "0C",
          color: "#b87333",
          fullName: "Copper",
        },
      ];

    const mythril = Math.floor(value / 10000000000);
    const diamond = Math.floor((value % 10000000000) / 100000000);
    const platinum = Math.floor((value % 100000000) / 1000000);
    const gold = Math.floor((value % 1000000) / 10000);
    const silver = Math.floor((value % 10000) / 100);
    const copper = Math.floor((value % 100) / 1);

    const currency: Currency[] = [];
    if (mythril > 0)
      currency.push({
        value: `${mythril}M`,
        color: "#bcb9ff",
        fullName: "Mythril",
      });
    if (diamond > 0 || (mythril > 0 && currency.length < 3))
      currency.push({
        value: `${diamond}D`,
        color: "#b9f2ff",
        fullName: "Diamond",
      });
    if (platinum > 0 || (diamond > 0 && currency.length < 3))
      currency.push({
        value: `${platinum}P`,
        color: "#e5e4e2",
        fullName: "Platinum",
      });
    if (gold > 0 && currency.length < 3)
      currency.push({
        value: `${gold}G`,
        color: "#ffd700",
        fullName: "Gold",
      });
    if (silver > 0 && currency.length < 3)
      currency.push({
        value: `${silver}S`,
        color: "#c0c0c0",
        fullName: "Silver",
      });
    if (copper > 0 && currency.length < 3)
      currency.push({
        value: `${copper}C`,
        color: "#b87333",
        fullName: "Copper",
      });
    return currency.slice(0, 3); // Ensure only up to 3 tiers are shown
  }

  function CurrencyDisplay(value: number) {
    const currencyComponents = convertToCurrency(value);

    return (
      <>
        {currencyComponents.map((currency, index) => (
          <span
            key={index}
            style={{
              color: currency.color,
              marginRight: index < currencyComponents.length - 1 ? "5px" : "0",
            }}
            title={`Full Name: ${currency.fullName}, Value: ${currency.value}`}
          >
            {currency.value}
          </span>
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
              ({CurrencyDisplay(item.value)}) x{item.amount}
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
