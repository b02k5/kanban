import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: #e9edf4;
  border-radius: 0 0 5px 5px;
`;

export const List = styled.ul<{ isDraggingOver: boolean }>`
  list-style-type: none;
  margin: 0;
  padding: 0 15px;
  max-height: calc(100vh - 182px);
  overflow-y: scroll;
  transition: background-color 0.15s ease;
  background-color: ${props =>
    props.isDraggingOver ? "#d3d9e1" : "transparent"};
`;

export const Item = styled.li`
  width: 100%;
  &:last-child {
    margin-bottom: 0;
  }
`;
