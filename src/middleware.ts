import { Middleware } from '@reduxjs/toolkit';
import { saveState } from './store';

export const autoSaveMiddleware: Middleware = store => next => action => {
  const result = next(action);
  const state = store.getState();
  saveState('characterState', state.character);
  saveState('inventoryState', state.inventory);
  return result;
};
