import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Game {
  id: string;
  title: string;
  releaseDate: string;
  publisher: string;
  genre: string;
  thumbnail: string;
  popularity: number;
  platform: string;
}

interface GamesState {
  games: Game[];
  loading: boolean;
  error: string | null;
}

const initialState: GamesState = {
  games: [],
  loading: false,
  error: null,
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    fetchGamesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchGamesSuccess(state, action: PayloadAction<Game[]>) {
      state.loading = false;
      state.games = action.payload;
    },
    fetchGamesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchGamesStart, fetchGamesSuccess, fetchGamesFailure } = gamesSlice.actions;

export default gamesSlice.reducer;


