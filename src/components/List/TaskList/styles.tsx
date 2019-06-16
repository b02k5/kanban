import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: #e9edf4;
  border-radius: 0 0 5px 5px;
`;

export const Overflow = styled.div`
  max-height: calc(100vh - 182px);
  overflow: hidden;
  overflow-y: auto;
  margin: 0 3px;
  padding: 0 12px;
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #888;
    &:hover {
      background: #555;
    }
  }
`;

export const List = styled.ul<{ isDraggingOver: boolean }>`
  width: 240px;
  padding: 0;
  list-style-type: none;
  overflow: hidden;
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
