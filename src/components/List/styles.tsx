import styled from "styled-components";
import Textarea from "react-textarea-autosize";

export const Main = styled.div`
  position: relative;
  width: 270px;
  margin-left: 15px;
`;

export const Header = styled.div`
  position: relative;
  padding: 10px 40px 0 15px;
  border-radius: 5px 5px 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #e9edf4;
`;

export const Draggable = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: grab;
`;

export const Name = styled(Textarea)`
  color: #36373a;
  font-size: 20px;
  line-height: 25px;
  font-weight: bold;
  width: 100%;
  margin: 0;
  padding: 2px 0 2px 10px;
  border: 0;
  border-bottom: 1px solid transparent;
  background-color: transparent;
  resize: none;
  transition: 0.1s;
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

export const Content = styled.div`
  height: calc(100vh - 170px);
`;
