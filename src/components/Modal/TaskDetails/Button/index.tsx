import React from "react";
import styled from "styled-components";

interface IProps {
  name: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = styled.button<{ name: string }>`
  color: ${props => (props.name === "Cancel" ? "#9ba8b0" : "#36373a")};
  border: 0;
  text-transform: uppercase;
  font-size: 15px;
  line-height: 20px;
  font-weight: 500;
  padding: 20px 10px;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: #eeeeee;
  }
`;

export default ({ name, onClick }: IProps) => (
  <Button onClick={onClick} name={name}>
    {name}
  </Button>
);
