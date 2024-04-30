import { useDispatch, useSelector } from "react-redux";
import { removeItem, setFilter, setSort, SortCriteria } from "./inventorySlice";
import { RootState } from "../../store";
import "./Inventory.scss";
import { useEffect, useState } from "react";

const Inventory = () => {
  const dispatch = useDispatch();
  const { items, filter, sort } = useSelector((state: RootState) => state.inventory);
  const [itemWidth, setItemWidth] = useState({ width: "32vh" });
  const [inventoryHeight, setInventoryHeight] = useState({ height: "49.5vh" });
  const [inventoryListHeight, setInventoryListHeight] = useState({ height: "40vh" });

  useEffect(() => {
    const handleResize = () => {
      const hasScrollbar = window.innerHeight > document.documentElement.clientHeight;

      if (hasScrollbar) {
        setItemWidth({ width: "31vh" });
        setInventoryHeight({ height: "48.5vh" });
        setInventoryListHeight({ height: "39vh" });
      } else {
        setItemWidth({ width: "32vh" });
        setInventoryHeight({ height: "49.5vh" });
        setInventoryListHeight({ height: "40vh" });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize on component mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
  // <img src={stick} alt="Stick" width="30"/>

  return (
    <div className="inventory-container" style={inventoryHeight}>
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
      <ul className="inventory-list" style={inventoryListHeight}>
        {sortedFilteredItems.map((item, index) => (
          <li className="item" key={index}>
            <span style={itemWidth}>
              <span className={`item-type-label item-type-${item.type}`}>[{item.type}] </span>
              {item.name}
            </span>
            <span>x{item.amount.toLocaleString("en-US")}</span>
            <span className="delete-button-container">
              <button
                className="delete-button"
                style={{ height: "1.7vh", width: "1.7vh", fontSize: "1vh" }}
                onClick={() => dispatch(removeItem({ name: item.name, type: item.type }))}
              >
                X
              </button>
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
