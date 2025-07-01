import styled from "@emotion/styled";
import PokeMarkChip from "../Common/PokeMarkChip";
import { useEffect, useState } from "react";
import { fetchPokeDetailAPI, PokemonDetailType } from "../Service/pokeService";
import { useParams } from "react-router-dom";
import { PokeImageSkeleton } from "../Common/PokeImageSkeleton";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../Store";
import { fetchPokemonDetail } from "../Store/pokemonDetailSlice";

const PokeDetail = () => {
  // const [pokemon, setPokemon] = useState<PokemonDetailType | null>(null);
  const { name } = useParams();
  const { pokemonDetails } = useSelector(
    (state: RootState) => state.pokemonDetail
  );
  const pokemon = name ? pokemonDetails[name] : null;
  const imageType = useSelector((state: RootState) => state.imageType.type);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!name) return;
    dispatch(fetchPokemonDetail(name));
    // (async () => {
    //   const detail = await fetchPokeDetailAPI(name);
    //   setPokemon(detail);
    // })();
  }, [name]);

  if (!name || !pokemon) {
    return (
      <Container>
        <ImgContainer>
          <PokeImageSkeleton />
        </ImgContainer>
        <Divider />
        <Footer>
          <PokeMarkChip />
        </Footer>
      </Container>
    );
  }

  return (
    <Container>
      <ImgContainer>
        <Img src={pokemon?.images[imageType]} alt={pokemon?.koreanName} />
      </ImgContainer>
      <Divider />
      <Body>
        <h2>기본 정보</h2>
        <Table>
          <tbody>
            <TableRow>
              <TableHeader scope="row">번호</TableHeader>
              <td>{pokemon?.id}</td>
            </TableRow>
            <TableRow>
              <TableHeader scope="row">이름</TableHeader>
              <td>{`${pokemon?.koreanName}(${pokemon?.name})`}</td>
            </TableRow>
            <TableRow>
              <TableHeader scope="row">타입</TableHeader>
              <td>{pokemon?.types.toString()}</td>
            </TableRow>
            <TableRow>
              <TableHeader scope="row">키</TableHeader>
              <td>{pokemon?.height}</td>
            </TableRow>
            <TableRow>
              <TableHeader scope="row">몸무게</TableHeader>
              <td>{`${pokemon?.weight}kg`}</td>
            </TableRow>
          </tbody>
        </Table>
        <h2>능력치</h2>
        <Table>
          <tbody>
            {pokemon?.baseStats.map((stat) => {
              return (
                <TableRow key={stat.name}>
                  <TableHeader scope="row">{stat.name}</TableHeader>
                  <td>{stat.value}</td>
                </TableRow>
              );
            })}
          </tbody>
        </Table>
      </Body>
      <Footer>
        <PokeMarkChip />
      </Footer>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 16px 32px;
  border: 1px solid #c0c0c0;
  border-radius: 20px;
  box-shadow: 1px 1px 3px 1px #c0c0c0;
`;

const ImgContainer = styled.section`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  min-height: 350px;
`;
const Img = styled.img`
  width: 300px;
  height: 300px;
`;

const Divider = styled.hr`
  margin: 20px;
  border-style: none;
  border-top: 1px dashed #d3d3d3;
`;

const Body = styled.section`
  margin: 0 32px;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto 16px;

  tr,
  td {
    padding: 6px 12px;
  }
`;
const TableRow = styled.tr`
  border-width: 1px 0;
  border-style: solid;
  border-color: #f0f0f0;
`;

const TableHeader = styled.th`
  width: 1px;
  white-space: nowrap;
  text-align: left;
  font-weight: normal;
  font-size: 14px;
  color: #a0a0a0;
`;

const Footer = styled.section`
  display: flex;
  margin: 32px 16px;
`;

export default PokeDetail;
