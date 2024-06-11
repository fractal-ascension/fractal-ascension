import { useDispatch, useSelector } from "react-redux";
import { addFilter, FilterType, removeFilter, removeItem, setFilter, setSort, SortCriteria } from "./inventorySlice";
import { RootState } from "../../store";
import ReactDOMServer from "react-dom/server";
import "./Inventory.scss";
import { Tooltip } from "react-tooltip";
import { Item, ItemType } from "../../Utils/Data/Items";
import { ItemTooltipUtil } from "../../Utils/Functions/ItemTooltipUtil";
import { equipEquipment, equipTool } from "../Character/characterSlice";

const Inventory = () => {
  const dispatch = useDispatch();
  const { items, filter, sort } = useSelector((state: RootState) => state.inventory);
  const skill = useSelector((state: RootState) => state.character.skill);

  const filteredItems = filter.includes("ALL")
    ? items // If "ALL" is included in the filter array, return all items
    : items.filter((item) => filter.includes(item.type)); // Otherwise, filter based on item types included in the filter array

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

  const handleDelete = (item: Item) => {
    if (window.confirm("Are you sure you want to delete this item?")) dispatch(removeItem({ item: item }));
    else if (item.unique) {
      if (window.confirm(`Are you sure you want to delete this UNIQUE item? You will not be able to get it back.`)) dispatch(removeItem({ item: item }));
    }
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>, filterType: FilterType) => {
    if (event.shiftKey) {
      // Toggle logic: add or remove based on current state
      if (filter.includes(filterType) && filterType !== "ALL") {
        dispatch(removeFilter(filterType)); // Remove the filter if already set
        if (filter.length === 1) dispatch(setFilter("ALL")); // If no filters are set, set "ALL"
      } else if (filterType === "ALL") {
        dispatch(setFilter("ALL")); // Set all filters
      } else {
        dispatch(removeFilter("ALL")); // Remove all filters
        dispatch(addFilter(filterType)); // Add the filter if not present
      }
    } else {
      dispatch(setFilter(filterType)); // Set this filter exclusively
    }
  };

  return (
    <div className="inventory-container">
      <div className="category-filter">
        {/* Filter for Atk Type, Overall Damage Type, Damage Type, Weight Type */}
        <button className={`inventory-button ${filter.includes("ALL") ? "active" : ""}`} onClick={(event) => handleFilterClick(event, "ALL")}>
          ALL
        </button>
        <button className={`inventory-button ${filter.includes(ItemType.WPN) ? "active" : ""}`} onClick={(event) => handleFilterClick(event, ItemType.WPN)}>
          WPN
        </button>
        <button className={`inventory-button ${filter.includes(ItemType.EQP) ? "active" : ""}`} onClick={(event) => handleFilterClick(event, ItemType.EQP)}>
          EQP
        </button>
        <button className={`inventory-button ${filter.includes(ItemType.TOOL) ? "active" : ""}`} onClick={(event) => handleFilterClick(event, ItemType.TOOL)}>
          TOOL
        </button>
        <button className={`inventory-button ${filter.includes(ItemType.USE) ? "active" : ""}`} onClick={(event) => handleFilterClick(event, ItemType.USE)}>
          USE
        </button>
        <button className={`inventory-button ${filter.includes(ItemType.CMBT) ? "active" : ""}`} onClick={(event) => handleFilterClick(event, ItemType.CMBT)}>
          CMBT
        </button>
        <button className={`inventory-button ${filter.includes(ItemType.ETC) ? "active" : ""}`} onClick={(event) => handleFilterClick(event, ItemType.ETC)}>
          ETC
        </button>
      </div>
      <ul className="inventory-list">
        {sortedFilteredItems.map((item, index) => (
          <li className="item" key={index} data-tooltip-id="item-tooltip" data-tooltip-html={ReactDOMServer.renderToStaticMarkup(item.weapon || item.tool ? ItemTooltipUtil(item, skill) : null)}>
            <span
              className="inventory-label"
              {...(item.equipmentSlot
                ? { onClick: () => dispatch(equipEquipment({ slot: item.equipmentSlot!, item: item.name })) }
                : { onClick: () => dispatch(equipTool({ slot: item.toolSlot!, item: item.name })) })}
            >
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
        <button className={`inventory-button ${sort === "AZ_ASC" || sort === "AZ_DESC" ? "active" : ""}`} onClick={() => dispatch(setSort("AZ"))}>
          A-Z
        </button>
        <button className={`inventory-button ${sort === "09_ASC" || sort === "09_DESC" ? "active" : ""}`} onClick={() => dispatch(setSort("09"))}>
          0-9
        </button>
        <button className={`inventory-button ${sort === "TYPE_ASC" || sort === "TYPE_DESC" ? "active" : ""}`} onClick={() => dispatch(setSort("TYPE"))}>
          TYPE
        </button>
      </div>
    </div>
  );
};

export default Inventory;
