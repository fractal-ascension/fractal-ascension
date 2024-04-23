import React from "react";
import { saveCharacter } from "../Character/characterSlice";
import { saveInventory } from "../Inventory/inventorySlice";
import { loadState, saveState, useAppDispatch, store } from "../../store"; // Ensure store is imported if needed for initialState
import "./footer.scss";

const Footer: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSave = () => {
    // Dispatching the Redux actions to update the state before saving
    dispatch(saveCharacter());
    dispatch(saveInventory());

    // Waiting for state updates to complete, then saving encoded state to local storage
    setTimeout(() => {
      const characterState = store.getState().character;
      const inventoryState = store.getState().inventory;
      saveState("characterState", characterState);
      saveState("inventoryState", inventoryState);
    }, 500); // Delay to ensure state is updated in the Redux store before saving
  };

  const handleExport = () => {
    const state = {
      character: loadState("characterState", store.getState().character),
      inventory: loadState("inventoryState", store.getState().inventory),
    };
    const encodedState = btoa(JSON.stringify(state));
    const blob = new Blob([encodedState], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "gameState.txt";
    link.click();
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result?.toString();
        if (text) {
          const decodedState = JSON.parse(atob(text));
          saveState("characterState", decodedState.character);
          saveState("inventoryState", decodedState.inventory);
          window.location.reload(); // Reload to apply the imported state
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div id="footer">
      <div className="footer_button" onClick={handleSave}>
        Save
      </div>
      <div className="footer_button" onClick={handleExport}>
        Export
      </div>
      <div className="footer_button">
        <input type="file" onChange={handleImport} style={{ display: "none" }} id="fileInput" />
        <label htmlFor="fileInput" className="buttonLabel">
          Import
        </label>
      </div>
    </div>
  );
};

export default Footer;
