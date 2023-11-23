import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: '',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentSongs:(state, action) => {
      if (action.payload?.tracks?.items) {
        state.currentSongs = action.payload?.tracks?.items;
      }
    },
    setActiveSong: (state, action) => { 
      state.activeSong = action.payload?.song;

      if (action.payload?.tracks?.items) {
        state.currentSongs = action.payload?.tracks?.items;
      } else if (action.payload?.data?.properties) {
        state.currentSongs = action.payload?.data?.tracks;
      } else {
        state.currentSongs = action.payload?.data;
      }

      state.currentIndex = action.payload?.i;
      state.isActive = true;
    },
    nextSong: (state, action) => {
      if (state.currentSongs[action.payload]?.data) {
        state.activeSong = state.currentSongs[action.payload]?.data;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      if (state.currentSongs[action.payload]?.data) {
        state.activeSong = state.currentSongs[action.payload]?.data;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

export const { setCurrentSongs, setActiveSong, nextSong, prevSong, playPause, selectGenreListId } = playerSlice.actions;

export default playerSlice.reducer;
