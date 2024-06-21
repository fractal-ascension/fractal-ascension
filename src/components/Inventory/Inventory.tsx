import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, FilterType, removeFilter, removeItem, setFilter, setSort, SortCriteria, SortType } from "./inventorySlice";
import { RootState } from "../../store";
import ReactDOMServer from "react-dom/server";
import "./Inventory.scss";
import { Tooltip } from "react-tooltip";
import { Item, ItemType } from "../../Utils/Data/Items";
import { ItemTooltipUtil } from "../../Utils/Functions/ItemTooltipUtil";
import { equipEquipment, equipTool } from "../Character/characterSlice";
import { ItemList } from "../../Utils/Data/Items/ItemList";

const Inventory: React.FC = () => {
  const dispatch = useDispatch();
  const { items, filter, sort } = useSelector((state: RootState) => state.inventory);
  const skill = useSelector((state: RootState) => state.character.skill);

  // Function to get full item details
  const getFullItemDetails = (id: string): Item | undefined => {
    return ItemList.find((item) => item.id === id);
  };

  const filteredItems = filter.includes("ALL")
    ? items
    : items.filter((item) => {
        const fullItem = getFullItemDetails(item.id);
        return fullItem && filter.includes(fullItem.type);
      });

  const sortedFilteredItems = [...filteredItems].sort((a, b) => {
    let sortCriteria: SortCriteria | "NONE" = "NONE";
    let sortDirection: "ASC" | "DESC" = "ASC";
    if (sort !== "NONE") {
      [sortCriteria, sortDirection] = sort.split("_") as [SortCriteria, "ASC" | "DESC"];
    }

    const itemA = getFullItemDetails(a.id);
    const itemB = getFullItemDetails(b.id);

    if (!itemA || !itemB) return 0;

    switch (sortCriteria) {
      case "AZ":
        return sortDirection === "DESC" ? itemB.name.localeCompare(itemA.name) : itemA.name.localeCompare(itemB.name);
      case "09":
        return sortDirection === "DESC" ? b.amount - a.amount : a.amount - b.amount;
      case "TYPE":
        return sortDirection === "DESC" ? itemB.type.localeCompare(itemA.type) : itemA.type.localeCompare(itemB.type);
      case "VAL":
        return sortDirection === "DESC" ? itemB.value - itemA.value : itemA.value - itemB.value;
      default:
        return 0;
    }
  });

  const handleDelete = (itemId: string) => {
    const fullItem = getFullItemDetails(itemId);
    if (!fullItem) return;

    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(removeItem({ id: itemId }));
    } else if (fullItem.unique) {
      if (window.confirm(`Are you sure you want to delete this UNIQUE item? You will not be able to get it back.`)) {
        dispatch(removeItem({ id: itemId }));
      }
    }
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>, filterType: FilterType) => {
    if (event.shiftKey) {
      if (filter.includes(filterType) && filterType !== "ALL") {
        dispatch(removeFilter(filterType));
        if (filter.length === 1) dispatch(setFilter("ALL"));
      } else if (filterType === "ALL") {
        dispatch(setFilter("ALL"));
      } else {
        dispatch(removeFilter("ALL"));
        dispatch(addFilter(filterType));
      }
    } else {
      dispatch(setFilter(filterType));
    }
  };

  const handleSortClick = (criteria: SortCriteria) => {
    const currentSort = sort === `${criteria}_ASC` ? `${criteria}_DESC` : `${criteria}_ASC`;
    dispatch(setSort(currentSort as SortType));
  };

  return (
    <div className="inventory-container">
      <div className="category-filter">
        <button className={`inventory-button ${filter.includes("ALL") ? "active" : ""}`} onClick={(event) => handleFilterClick(event, "ALL")}>
          ALL
        </button>
        {Object.values(ItemType).map((type) => (
          <button key={type} className={`inventory-button ${filter.includes(type) ? "active" : ""}`} onClick={(event) => handleFilterClick(event, type)}>
            {type}
          </button>
        ))}
      </div>
      <ul className="inventory-list">
        {sortedFilteredItems.map((item) => {
          const fullItem = getFullItemDetails(item.id);
          if (!fullItem) return null;

          return (
            <li
              className="item"
              key={item.id}
              data-tooltip-id="item-tooltip"
              data-tooltip-html={ReactDOMServer.renderToStaticMarkup(fullItem.weapon || fullItem.tool ? ItemTooltipUtil(fullItem, skill) : null)}
            >
              <span
                className="inventory-label"
                onClick={() => {
                  if (fullItem.equipmentSlot) {
                    dispatch(equipEquipment({ slot: fullItem.equipmentSlot, item: fullItem.name }));
                  } else if (fullItem.toolSlot) {
                    dispatch(equipTool({ slot: fullItem.toolSlot, item: fullItem.name }));
                  }
                }}
              >
                <span className={`item-type-label item-type-${fullItem.type}`}>[{fullItem.type}] </span>
                {fullItem.name}
              </span>
              <span>x{item.amount.toLocaleString("en-US")}</span>
              <span className="delete-button-container">
                <button className="delete-button" onClick={() => handleDelete(item.id)}>
                  X
                </button>
              </span>
              <Tooltip id="item-tooltip" />
            </li>
          );
        })}
      </ul>
      <div className="sort-buttons">
        <button className={`inventory-button ${sort.startsWith("AZ") ? "active" : ""}`} onClick={() => handleSortClick("AZ")}>
          A-Z
        </button>
        <button className={`inventory-button ${sort.startsWith("09") ? "active" : ""}`} onClick={() => handleSortClick("09")}>
          0-9
        </button>
        <button className={`inventory-button ${sort.startsWith("TYPE") ? "active" : ""}`} onClick={() => handleSortClick("TYPE")}>
          TYPE
        </button>
      </div>
    </div>
  );
};

export default Inventory;
