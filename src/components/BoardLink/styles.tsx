import styled from "styled-components";

export const Item = styled.div`
  margin-right: 15px;
  margin-bottom: 15px;
`;

export const Name = styled.span`
  display: block;
  height: 100%;
  background-color: rgba(73, 83, 121, 0.69);
  width: 170px;
  height: 75px;
  border-radius: 3px;
  padding: 10px 15px;
  text-decoration: none;
  transition: 0.1s;
  &:hover {
    background-color: rgba(73, 83, 121, 0.8);
  }
`;
