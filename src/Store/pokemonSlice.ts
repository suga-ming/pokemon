import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchPokemonsAPI,
  PokemonListResponseType,
} from "../Service/pokeService";

// First, create the thunk
export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async (nextUrl?: string) => {
    const response = await fetchPokemonsAPI(nextUrl);
    return response;
  }
);

interface PokemonState {
  pokemons: PokemonListResponseType;
}

const initialState = {
  pokemons: {
    count: 0,
    next: "",
    results: [],
  },
} as PokemonState;

// Then, handle actions in your reducers:
const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchPokemons.fulfilled,
      (state, action: PayloadAction<PokemonListResponseType>) => {
        if (state.pokemons.results.length > 0) {
          state.pokemons = {
            ...action.payload,
            results: [...state.pokemons.results, ...action.payload.results],
          };
        } else {
          state.pokemons = action.payload;
        }
      }
    );
  },
});

export const pokemonsReducer = pokemonsSlice.reducer;
