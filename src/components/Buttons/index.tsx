import React from "react";

import * as Button from "./styles";

export enum EActionName {
  Board = "Board",
  List = "List",
  Task = "Task"
}

interface IProps {
  children: Node | string;
  actionName: EActionName;
  disabled: boolean;
  onClick: () => void;
}

export const ButtonAdd = ({
  children,
  onClick,
  disabled,
  actionName
}: IProps) => (
  <Button.ButtonAdd
    actionName={actionName}
    onClick={onClick}
    disabled={disabled}
  >
    <Button.Plus />
    {children}
  </Button.ButtonAdd>
);
