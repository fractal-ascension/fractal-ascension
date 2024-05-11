import React, { useEffect, useState } from "react";
import { loadState, saveState, store, useAppDispatch } from "../../store";
import { saveCharacter } from "../Character/characterSlice";
import { saveInventory } from "../Inventory/inventorySlice";
import { saveMessage } from "../Message/messageSlice";
import { saveGlobalTime, updateTime } from "../../Utils/Slices/globalTimeSlice";
import "./App.scss";
import Character from "../Character/Character";
import Inventory from "../Inventory/Inventory";
import Display from "../Display/Display";
import Message from "../Message/Message";
import { saveProgress } from "../../Utils/Slices/progressSlice";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const [timerId, setTimerId] = useState<number | null>(null);
  const [saveIntervalId, setSaveIntervalId] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      dispatch(updateTime());
    }, 1000);
    setTimerId(id);
    return () => clearInterval(id);
  }, [dispatch]);

  useEffect(() => {
    // Simulate a loading process.
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust time based on your actual load time
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      // STATEMARKER
      dispatch(saveCharacter());
      dispatch(saveInventory());
      dispatch(saveMessage());
      dispatch(saveGlobalTime());
      dispatch(saveProgress());

      // Waiting for state updates to complete, then saving encoded state to local storage
      setTimeout(() => {
        // STATEMARKER
        saveState("characterState", store.getState().character);
        saveState("inventoryState", store.getState().inventory);
        saveState("messageState", store.getState().message);
        saveState("globalTimeState", store.getState().globalTime);
        saveState("progressState", store.getState().progress);
      }, 500); // Delay to ensure state is updated in the Redux store before saving
    }, 300000);
    setSaveIntervalId(id);
    return () => clearInterval(id);
  }, [dispatch]);

  if (loading) {
    return (
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  const handleSave = () => {
    // Dispatching the Redux actions to update the state before saving
    // STATEMARKER
    dispatch(saveCharacter());
    dispatch(saveInventory());
    dispatch(saveMessage());
    dispatch(saveGlobalTime());
    dispatch(saveProgress());

    // Waiting for state updates to complete, then saving encoded state to local storage
    setTimeout(() => {
      // STATEMARKER
      saveState("characterState", store.getState().character);
      saveState("inventoryState", store.getState().inventory);
      saveState("messageState", store.getState().message);
      saveState("globalTimeState", store.getState().globalTime);
      saveState("progressState", store.getState().progress);
    }, 500); // Delay to ensure state is updated in the Redux store before saving
  };

  const handleExport = () => {
    const state = {
      // STATEMARKER
      character: loadState("characterState", store.getState().character),
      inventory: loadState("inventoryState", store.getState().inventory),
      message: loadState("messageState", store.getState().message),
      globalTime: loadState("globalTimeState", store.getState().globalTime),
      progress: loadState("progressState", store.getState().progress),
    };
    const encodedState = btoa(JSON.stringify(state));
    const blob = new Blob([encodedState], { type: "text/plain;charset=utf-8" });

    // Generate the timestamp
    const now = new Date();
    const date = now.toLocaleDateString("en-GB").replace(/\//g, "-"); // Converts date to dd-mm-yyyy format
    const time = now
      .toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false })
      .replace(/:/g, "-"); // Converts time to HH-mm format

    // Create the download link with the timestamp
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `fractal-ascension-save (${date} ${time}).txt`; // Adjust the filename format
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
          // STATEMARKER
          saveState("characterState", decodedState.character);
          saveState("inventoryState", decodedState.inventory);
          saveState("messageState", decodedState.message);
          saveState("globalTimeState", decodedState.globalTime);
          saveState("progressState", decodedState.progress);
          window.location.reload();
        }
      };
      reader.readAsText(file);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the game? All data will be lost.")) {
      // Clear intervals
      if (timerId) clearInterval(timerId);
      if (saveIntervalId) clearInterval(saveIntervalId);

      // Use a short timeout to allow dispatches to complete
      setTimeout(() => {
        // STATEMARKER
        localStorage.removeItem("characterState");
        localStorage.removeItem("inventoryState");
        localStorage.removeItem("messageState");
        localStorage.removeItem("globalTimeState");
        localStorage.removeItem("progressState");

        window.location.reload();
      }, 100); // Adjust time as needed, should be short
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
          <Message />
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
