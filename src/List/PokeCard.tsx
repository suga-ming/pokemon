import styled from "@emotion/styled";
import PokeNameChip from "../Common/PokeNameChip";
import PokeMarkChip from "../Common/PokeMarkChip";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPokeDetailAPI, PokemonDetailType } from "../Service/pokeService";
import { PokeImageSkeleton } from "../Common/PokeImageSkeleton";
import { useIntersectionObserver } from "react-intersection-observer-hook";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../Store";
import { fetchPokemonDetail } from "../Store/pokemonDetailSlice";

interface PokeCardProps {
  name: string;
}

const PokeCard = (props: PokeCardProps) => {
  const navigate = useNavigate();
  const imageType = useSelector((state: RootState) => state.imageType.type);
  const { pokemonDetails } = useSelector(
    (state: RootState) => state.pokemonDetail
  );
  // const [pokemon, setPokemon] = useState<PokemonDetailType | null>(null);
  const pokemon = pokemonDetails[props.name];
  const dispatch = useAppDispatch();
  const [ref, { entry }] = useIntersectionObserver();
  const isVisible = entry && entry.isIntersecting;

  useEffect(() => {
    if (!isVisible) return;
    dispatch(fetchPokemonDetail(props.name));

    // (async () => {
    //   const detail = await fetchPokeDetail(props.name);
    //   setPokemon(detail);
    // })();
  }, [dispatch, props.name, isVisible]);

  const handelerClick = () => {
    navigate(`/pokemon/${props.name}`);
  };

  if (!pokemon) {
    return (
      <Item color={"#fff"} ref={ref}>
        <Header>
          <PokeNameChip name={"포켓몬"} color={"#ffca09"} id={0} />
        </Header>
        <Body>
          <PokeImageSkeleton />
        </Body>
        <Footer>
          <PokeMarkChip />
        </Footer>
      </Item>
    );
  }

  return (
    <Item onClick={handelerClick} color={pokemon.color} ref={ref}>
      <Header>
        <PokeNameChip
          name={pokemon.koreanName}
          color={pokemon.color}
          id={pokemon.id}
        />
      </Header>
      <Body>
        <Img src={pokemon.images[imageType]} alt={pokemon.name} />
      </Body>
      <Footer>
        <PokeMarkChip />
      </Footer>
    </Item>
  );
};

const Item = styled.li<{ color: string }>`
  width: 250px;
  height: 300px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border: 1px solid #c0c0c0;
  box-shadow: 1px 1px 3px 1px #c0c0c0;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    background-color: ${(props) => props.color};
    opacity: 0.8;
    transition: background-color 0s;
  }
`;

const Header = styled.section`
  display: flex;
`;

const Body = styled.section`
  display: flex;
  /* flex: 1; */
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const Img = styled.img`
  width: 180px;
  height: 180px;
`;

const Footer = styled.section`
  display: flex;
  margin-bottom: 15px;
`;

export default PokeCard;
