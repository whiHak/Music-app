import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import playerReducer from './features/playerSlice';
import { spotifyApi } from './services/spotify';

export const store = configureStore({
  reducer: {
    [spotifyApi.reducerPath]: spotifyApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(spotifyApi.middleware)
});
