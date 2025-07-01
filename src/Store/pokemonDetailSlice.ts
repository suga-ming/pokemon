import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchPokeDetailAPI,
  PokemonDetailType,
  PokemonListResponseType,
} from "../Service/pokeService";
import { RootState } from ".";

export const fetchPokemonDetail = createAsyncThunk(
  "pokemon/fetchPokemonsDetail",
  async (name: string) => {
    const response = await fetchPokeDetailAPI(name);
    return response;
  },
  {
    //network에 밑으로 내렸다가 다시 위로 올리면 데이터 뜨지않게
    condition: (name, { getState }) => {
      const { pokemonDetail } = getState() as RootState;
      const pokemon = pokemonDetail.pokemonDetails[name];
      return !pokemon;
    },
  }
);

interface PokemonDetailState {
  // pokemonDetails: {
  // '이상해씨': PokemonDetailType,
  // '피카츄': PokemonDetailType,
  //}
  pokemonDetails: Record<string, PokemonDetailType>;
}

const initialState = {
  pokemonDetails: {},
} as PokemonDetailState;

const pokemonDetailSlice = createSlice({
  name: "pokemonDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchPokemonDetail.fulfilled,
      (state, action: PayloadAction<PokemonDetailType>) => {
        state.pokemonDetails = {
          ...state.pokemonDetails,
          [action.payload.name]: action.payload,
        };
      }
    );
  },
});

export const pokemonDetailReducer = pokemonDetailSlice.reducer;
