import styled from "styled-components";

export const Plus = styled.span<{ action: string }>`
  position: relative;
  width: 8px;
  height: 2px;
  background-color: ${props => (props.action === "task" ? "#777a80" : "white")}
  margin-right: 5px;
  transition: 0.15s;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 8px;
    height: 2px;
    background-color: ${props =>
      props.action === "task" ? "#777a80" : "white"}
    transform: rotate(90deg);
    transition: 0.15s;
  }
`;

export const MainAdd = styled.button<{ action: string }>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${props => (props.action === "task" ? "#777a80" : "#e9edf4")};
  font-size: 14px;
  line-height: 19px;
  font-weight: 500;
  width: ${props => (props.action === "task" ? "100%" : "280px")}
  border-radius: ${props => (props.action === "task" ? "0 0 5px 5px;" : "5px")};
  padding: 15px;
  border: 0;
  cursor: pointer;
  margin-left: ${props => props.action === "list" && "15px"};
  transition: 0.15s;
  background-color: ${props =>
    props.action === "task" ? "#e9edf4" : "rgba(0, 0, 0, 0.24)"};
  &:hover {
    color: ${props => (props.action === "task" ? "#3d3f43" : "white")};
    background-color: ${props =>
      props.action === "task" ? "#d3d9e1" : "rgba(0, 0, 0, 0.32)"};
  }

  &:hover ${Plus} {
    background-color: ${props =>
      props.action === "task" ? "#3d3f43" : "#e9edf4"};
    &::before {
      background-color: ${props =>
        props.action === "task" ? "#3d3f43" : "#e9edf4"};
    }
  }
`;
