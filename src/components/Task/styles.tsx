import styled from "styled-components";

export const Main = styled.div<{ isDragging: boolean }>`
  width: 100%;
  padding: 15px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background-color 0.15s ease;
  background-color: ${props => (props.isDragging ? "#67686d" : "white")};
`;

export const Name = styled.h3<{ isDragging: boolean }>`
  color: ${props => (props.isDragging ? "white" : "#212225")};
  font-size: 17px;
  line-height: 22px;
  font-weight: 500;
  display: block;
  margin: 0;
`;

export const Time = styled.time`
  display: block;
  color: #a4afb6;
  font-size: 11px;
  line-height: 16px;
  margin-bottom: 1px;
`;

export const Description = styled.p<{ isDragging: boolean }>`
  color: ${props => (props.isDragging ? "white" : "#4e4f53")};
  font-size: 13px;
  line-height: 18px;
  margin: 10px 0 0 0;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 15px;
`;
