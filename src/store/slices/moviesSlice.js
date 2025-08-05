import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'https://swapi.info/api';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/films`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCharacters = createAsyncThunk(
  'movies/fetchCharacters',
  async ({ movieId, characterUrls }, { rejectWithValue }) => {
    try {
      const characterPromises = characterUrls.map(url => 
        fetch(url).then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
      );
      
      const characters = await Promise.all(characterPromises);
      return { movieId, characters };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    characters: {},
    loadingCharacters: {}, 
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCharacters.pending, (state, action) => {
        const movieId = action.meta.arg.movieId;
        state.loadingCharacters[movieId] = true;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        const { movieId, characters } = action.payload;
        state.loadingCharacters[movieId] = false;
        state.characters[movieId] = characters;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        const movieId = action.meta.arg.movieId;
        state.loadingCharacters[movieId] = false;
      });
  },
});

export const { clearError } = moviesSlice.actions;
export default moviesSlice.reducer;
