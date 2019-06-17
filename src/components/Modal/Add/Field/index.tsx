import React from "react";

import * as Field from "./styles";

interface IProps {
  name: string;
  value: string;
  autoFocus: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeydown?: (e: React.KeyboardEvent) => void;
}

export default ({
  name,
  onChange,
  onKeydown,
  value,
  autoFocus
}: IProps): JSX.Element => (
  <>
    <Field.Label value={value}>{name}</Field.Label>
    <Field.TextareaAutoSize
      onChange={onChange}
      onKeyDown={onKeydown}
      style={{}}
      autoFocus={autoFocus}
      required
    />
  </>
);
