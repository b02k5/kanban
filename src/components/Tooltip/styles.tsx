import styled from "styled-components";

export const Main = styled.div`
  position: absolute;
  top: 45px;
  right: -200px;
  width: 250px;
  border-radius: 3px;
  overflow: hidden;
  padding: 10px 0;
  box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25),
    0 0 0 1px rgba(9, 30, 66, 0.08);
  background-color: white;
  z-index: 3;
`;

export const Name = styled.span`
  color: #a4afb6;
  display: block;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  border-bottom: 1px solid rgba(9, 30, 66, 0.13);
  padding-bottom: 10px;
  margin: 0 15px 10px 15px;
`;

export const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const Item = styled.li``;

export const Button = styled.button`
  color: #36373a;
  width: 100%;
  text-align: left;
  margin: 0;
  padding: 10px 15px;
  border: 0;
  font-size: 14px;
  line-height: 19px;
  font-weight: 500;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: #e9edf4;
  }
`;
