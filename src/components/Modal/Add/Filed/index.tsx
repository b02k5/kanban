import React, { Fragment } from "react";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

interface IProps {
  name: string;
  value: string;
  autoFocus: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Label = styled.label<{ value: string }>`
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

export default ({ name, onChange, value, autoFocus }: IProps): JSX.Element => (
  <Fragment>
    <Label value={value}>{name}</Label>
    <TextareaAutosize
      onChange={onChange}
      style={{
        position: "relative",
        border: 0,
        borderBottom: "1px solid rgba(9, 45, 66, 0.4)",
        color: "#36373a",
        fontSize: "15px",
        lineHeight: "20px",
        fontWeight: 500,
        resize: "none",
        width: "100%",
        minHeight: "30px",
        padding: "5px 7px",
        background: "transparent",
        zIndex: 2
      }}
      autoFocus={autoFocus}
      required
    />
  </Fragment>
);
