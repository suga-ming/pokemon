import styled from "@emotion/styled";
import PokeCard from "./PokeCard";
import {
  fetchPokemonsAPI,
  PokemonListResponseType,
} from "../Service/pokeService";
import { useEffect, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { fetchPokemons } from "../Store/pokemonSlice";
import { RootState, useAppDispatch } from "../Store";
import { useSelector } from "react-redux";

const PokeCardList = () => {
  const dispatch = useAppDispatch();
  // const [pokemons, setPokemons] = useState<PokemonListResponseType>({
  //   count: 0,
  //   next: "",
  //   results: [],
  // });
  const { pokemons } = useSelector((state: RootState) => state.pokemons);

  const [infiniteRef] = useInfiniteScroll({
    loading: false,
    hasNextPage: pokemons.next !== "",
    onLoadMore: async () => {
      dispatch(fetchPokemons(pokemons.next));
      // const morePokemons = await fetchPokemonsAPI(pokemons.next);
      // setPokemons({
      //   ...morePokemons,
      //   results: [...pokemons.results, ...morePokemons.results],
      // });
    },
    disabled: false,
    rootMargin: "0px 0px 400px 0px",
  });

  useEffect(() => {
    // if (pokemons.results.length === 0) {
    dispatch(fetchPokemons());
    // }

    // (async () => {
    //   const pokemons = await fetchPokemonsAPI();
    //   setPokemons(pokemons);
    // })();
  }, [dispatch]);
  return (
    <>
      <List>
        {pokemons.results.map((pokemon, index) => {
          return (
            <PokeCard key={`${pokemon.name}_${index}`} name={pokemon.name} />
          );
        })}
      </List>
      <Loading ref={infiniteRef}>Loading...</Loading>
    </>
  );
};

const Loading = styled.div`
  display: flex;
  justify-content: center;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

export default PokeCardList;
