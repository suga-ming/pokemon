import styled from "@emotion/styled";

const PokeMarkChip = () => {
  return <Chip>Pokémon</Chip>;
};

const Chip = styled.div`
  display: flex;

  border: 1px solid #c0c0c0;
  border-radius: 20px;
  box-shadow: 0.5px 0.5px 0 0 #c0c0c0;

  font-size: 14px;
  padding: 0px 8px;
  margin: 5px 10px 0 auto;
`;

export default PokeMarkChip;
