import React from "react";

import * as ButtonAdd from "./styles";

interface IProps {
  children: Node | string;
  actionName: string;
  onClick: () => void;
}

export const AddButton = ({ children, actionName, onClick }: IProps) => (
  <ButtonAdd.MainAdd action={actionName} onClick={onClick}>
    <ButtonAdd.Plus action={actionName} />
    {children}
  </ButtonAdd.MainAdd>
);
