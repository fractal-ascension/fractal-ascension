import React, { useEffect, useState } from "react";
import { RootState, loadState, saveState, store, useAppDispatch } from "../../store";
import { saveCharacter } from "../Character/characterSlice";
import { saveInventory } from "../Inventory/inventorySlice";
import { saveMessage } from "../Message/messageSlice";
import { saveGlobalTime, updateTime } from "../../Utils/globalTimeSlice";
import "./App.scss";
import Character from "../Character/Character";
import Inventory from "../Inventory/Inventory";
import Display from "../Display/Display";
import Message from "../Message/Message";
import { useSelector } from "react-redux";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const [timerId, setTimerId] = useState<number | null>(null);
  const [saveIntervalId, setSaveIntervalId] = useState<number | null>(null);

  const globalTime = useSelector((state: RootState) => state.globalTime);

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
      dispatch(saveCharacter());
      dispatch(saveInventory());
      dispatch(saveMessage());
      dispatch(saveGlobalTime());

      // Waiting for state updates to complete, then saving encoded state to local storage
      setTimeout(() => {
        const characterState = store.getState().character;
        const inventoryState = store.getState().inventory;
        const messageState = store.getState().message;
        const globalTimeState = store.getState().globalTime;

        saveState("characterState", characterState);
        saveState("inventoryState", inventoryState);
        saveState("messageState", messageState);
        saveState("globalTimeState", globalTimeState);
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
    dispatch(saveCharacter());
    dispatch(saveInventory());
    dispatch(saveMessage());
    dispatch(saveGlobalTime());

    // Waiting for state updates to complete, then saving encoded state to local storage
    setTimeout(() => {
      const characterState = store.getState().character;
      const inventoryState = store.getState().inventory;
      const messageState = store.getState().message;
      const globalTimeState = store.getState().globalTime;

      saveState("characterState", characterState);
      saveState("inventoryState", inventoryState);
      saveState("messageState", messageState);
      saveState("globalTimeState", globalTimeState);
    }, 500); // Delay to ensure state is updated in the Redux store before saving
  };

  const handleExport = () => {
    const state = {
      character: loadState("characterState", store.getState().character),
      inventory: loadState("inventoryState", store.getState().inventory),
      message: loadState("messageState", store.getState().message),
      globalTime: loadState("globalTimeState", store.getState().globalTime),
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
          saveState("characterState", decodedState.character);
          saveState("inventoryState", decodedState.inventory);
          saveState("messageState", decodedState.message);
          saveState("globalTimeState", decodedState.globalTime);
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
        localStorage.removeItem("characterState");
        localStorage.removeItem("inventoryState");
        localStorage.removeItem("messageState");
        localStorage.removeItem("globalTimeState");

        // Optionally reset state in Redux if needed here
        // dispatch(resetStateAction()); // If you have actions to reset Redux state

        // Reload to ensure all components reinitialize cleanly
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
          <Display
            day={globalTime.day}
            weekDay={globalTime.weekDay}
            weekName={globalTime.weekName}
            week={globalTime.week}
            monthName={globalTime.monthName}
            month={globalTime.month}
            year={globalTime.year}
            hour={globalTime.hour}
            minute={globalTime.minute}
            ampm={globalTime.ampm}
          />
        </div>
        <div className="column">
          <Message hour={globalTime.hour} minute={globalTime.minute} />
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
