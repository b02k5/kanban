import styled from "styled-components";

export const Main = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  margin: 0;
  padding: 0;
  width: 25px;
  height: 30px;
  border: 0;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
  transition: 0.15s;
  &:hover {
    background-color: rgba(78, 79, 83, 0.1);
  }
`;

export const Circle = styled.span`
  position: relative;
  display: block;
  width: 4px;
  height: 4px;
  background-color: #9d9d9f;
  border-radius: 50%;
  &::before,
  &::after {
    content: "";
    left: 0;
    position: absolute;
    width: 4px;
    height: 4px;
    background-color: #9d9d9f;
    border-radius: 50%;
  }
  &::before {
    top: -6px;
  }
  &::after {
    top: 6px;
  }
`;
