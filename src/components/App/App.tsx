import React, { useEffect } from "react";
import { saveState, store, useAppDispatch } from "../../store";
import { saveCharacter } from "../Character/characterSlice";
import { saveInventory } from "../Inventory/inventorySlice";
import Main from "../Main/Main";
import Footer from "../Footer/footer";
import "./App.scss";

const App: React.FC = () => {
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

  return (
    <>
      <div className="app">
        <Main></Main>
        <Footer></Footer>
      </div>
    </>
  );
};

export default App;
