import styled from "styled-components";
import Textarea from "react-textarea-autosize";

export const TextareaAutoSize = styled(Textarea)`
  position: relative;
  border: 0;
  border-bottom: 1px solid rgba(9, 45, 66, 0.4);
  color: #36373a;
  font-size: 15px;
  line-height: 20px;
  font-weight: 500;
  resize: none;
  width: 100%;
  min-height: 30px;
  padding: 5px 7px;
  background-color: transparent;
  z-index: 2;
  &:focus {
    border-color: #2684ff;
  }
  &:invalid {
    box-shadow: none;
  }
`;

export const Label = styled.label<{ value: string }>`
  position: absolute;
  top: 7px;
  left: 7px;
  font-size: 15px;
  line-height: 20px;
  font-weight: 500;
  color: #36373a;
  display: block;
  transform: ${props =>
    props.value ? "translateY(-20px) scale(0.8)" : "translateY(0) scale(1)"};
  transform-origin: ${props => (props.value ? "0 0" : "0 0")};
  transition: 0.2s;
  z-index: 1;
`;
