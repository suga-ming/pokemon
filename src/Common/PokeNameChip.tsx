import styled from "@emotion/styled";

interface PokeNameChipProps {
  name: string;
  id: number;
  color: string;
}

const PokeNameChip = (props: PokeNameChipProps) => {
  const renderNumber = (id: number) => {
    const digits = 3;
    const numberString = id.toString();

    if (numberString.length >= digits) {
      return numberString;
    }

    let result = "";
    for (let i = 0; i < digits - numberString.length; i++) {
      result += "0";
    }

    return `${result}${numberString}`;
  };
  return (
    <div>
      <Chip>
        <Number color={props.color}>{renderNumber(props.id)}</Number>
        <ChipText>{props.name}</ChipText>
      </Chip>
    </div>
  );
};

const Chip = styled.div`
  border: 1px solid #c0c0c0;
  border-radius: 20px;
  margin: 10px 0px 0px 10px;
  display: flex;
  box-shadow: 0.5px 0.5px 0 0 #c0c0c0;
`;
const Number = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  border-radius: 13px;
  font-weight: 500;
  padding: 2px 7px;
  opacity: 0.8;
`;

const ChipText = styled.label`
  padding: 3px 5px;
`;

export default PokeNameChip;
