import { useDispatch, useSelector } from "react-redux";
import { removeItem, setFilter, setSort, SortCriteria } from "./inventorySlice";
import { RootState } from "../../store";
import ReactDOMServer from "react-dom/server";
import "./Inventory.scss";
import { Tooltip } from "react-tooltip";
import { Item, ItemType } from "../../Utils/Data/Items";
import { ItemTooltipUtil } from "../../Utils/Functions/ItemTooltipUtil";

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

  const handleDelete = (item: Item) => {
    if (window.confirm("Are you sure you want to delete this item?"))
      dispatch(removeItem({ item: item }));
    else if (item.unique) {
      if (
        window.confirm(
          `Are you sure you want to delete this UNIQUE item? You will not be able to get it back.`
        )
      )
        dispatch(removeItem({ item: item }));
    }
  };

  return (
    <div className="inventory-container">
      <div className="category-filter">
        <button className="category-button" onClick={() => dispatch(setFilter("ALL"))}>
          ALL
        </button>
        {/* Filter for Atk Type, Overall Damage Type, Damage Type, Weight Type */}
        <button className="category-button" onClick={() => dispatch(setFilter(ItemType.WPN))}>
          WPN
        </button>
        <button className="category-button" onClick={() => dispatch(setFilter(ItemType.EQP))}>
          EQP
        </button>
        <button className="category-button" onClick={() => dispatch(setFilter(ItemType.TOOL))}>
          TOOL
        </button>
        <button className="category-button" onClick={() => dispatch(setFilter(ItemType.USE))}>
          USE
        </button>
        <button className="category-button" onClick={() => dispatch(setFilter(ItemType.CMBT))}>
          CMBT
        </button>
        <button className="category-button" onClick={() => dispatch(setFilter(ItemType.ETC))}>
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
              item.weapon || item.tool ? ItemTooltipUtil(item) : null
            )}
          >
            <span className="inventory-label">
              <span className={`item-type-label item-type-${item.type}`}>[{item.type}] </span>
              {item.name}
            </span>
            <span>x{item.amount.toLocaleString("en-US")}</span>
            <span className="delete-button-container">
              <button className="delete-button" onClick={() => handleDelete(item)}>
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
