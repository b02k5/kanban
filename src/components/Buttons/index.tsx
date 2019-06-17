import React from "react";

import * as ButtonL from "./styles";

export enum EAddNewComponent {
  Board = "Board",
  List = "List",
  Task = "Task"
}

export enum EConfirmModalForm {
  Cancel = "Cancel",
  Create = "Create"
}

interface IAddNewComponent {
  children: Node | string;
  actionName: EAddNewComponent;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface IProps {
  children: Node | string;
  actionName: EConfirmModalForm;
  disabled: boolean;
  styles: any;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ButtonAdd = ({
  children,
  onClick,
  actionName
}: IAddNewComponent) => (
  <ButtonL.ButtonAdd actionName={actionName} onClick={onClick}>
    <ButtonL.Plus />
    {children}
  </ButtonL.ButtonAdd>
);

export const Button = ({
  children,
  onClick,
  disabled,
  styles,
  actionName
}: IProps) => (
  <ButtonL.Main
    actionName={actionName}
    as={styles}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </ButtonL.Main>
);
