import React from "react";

import * as Field from "./styles";

interface IProps {
  name: string;
  value: string;
  autoFocus: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default ({ name, onChange, value, autoFocus }: IProps): JSX.Element => (
  <>
    <Field.Label value={value}>{name}</Field.Label>
    <Field.TextareaAutoSize
      onChange={onChange}
      style={{}}
      autoFocus={autoFocus}
      required
    />
  </>
);
