import React, { useEffect, useState } from "react";
import { loadState, saveState, store, useAppDispatch } from "../../store";
import { saveCharacter } from "../Character/characterSlice";
import { saveInventory } from "../Inventory/inventorySlice";
import "./App.scss";
import Character from "../Character/Character";
import Inventory from "../Inventory/Inventory";
import Display from "../Display/Display";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading process.
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust time based on your actual load time
  }, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(saveCharacter());
      dispatch(saveInventory());

      // Waiting for state updates to complete, then saving encoded state to local storage
      setTimeout(() => {
        const characterState = store.getState().character;
        const inventoryState = store.getState().inventory;
        saveState("characterState", characterState);
        saveState("inventoryState", inventoryState);
      }, 500); // Delay to ensure state is updated in the Redux store before saving
    }, 300000); // 300,000 milliseconds = 5 minutes

    return () => clearInterval(intervalId);
  }, [dispatch]);

  if (loading) {
    return (
      <div style={{ backgroundColor: "black", color: "white", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        Loading...
      </div>
    );
  }

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
          window.location.reload();
        }
      };
      reader.readAsText(file);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the game? All data will be lost.")) {
      localStorage.removeItem("characterState");
      localStorage.removeItem("inventoryState");
      window.location.reload();
    }
  };

  return (
    <div className="app">
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
      <div id="footer" className="footer-container">
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
        <div className="footer_button reset-button" onClick={handleReset}>
          Reset Game
        </div>
      </div>
    </div>
  );
};

export default App;
