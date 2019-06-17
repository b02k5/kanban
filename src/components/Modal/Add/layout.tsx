import React from "react";
import styled from "styled-components";

import Modal from "../index";
import Field from "./Filed";
import { Button } from "../../Buttons";
import { EConfirmModalForm } from "../../Buttons";

interface IProps {
  taskName: string;
  taskDesc: string;
  modalName: string;
  listId?: number;
  onSubmitForm: (e: any) => void;
  onTextareaName: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onTextareaDesc: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onModalToggle: () => void;
}

const ContainerStyles = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 425px;
  height: 100vh;
  padding: 65px 35px;
  background-color: #fefefe;
`;
const ModalTitle = styled.h1`
  font-size: 40px;
  font-weight: 45px;
  font-weight: bold;
  margin: 0 0 90px 0;
  color: #36373a;
`;
const ModalForm = styled.form``;
const ModalField = styled.div`
  position: relative;
  margin-bottom: 25px;
`;
const ModalFooter = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background-color: white;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.1);
  padding: 0 35px;
`;

const ButtonModal = styled.button<{ actionName: EConfirmModalForm }>`
  color: ${props =>
    props.actionName === EConfirmModalForm.Cancel ? "#9ba8b0" : "#36373a"};
  text-transform: uppercase;
  font-size: 15px;
  line-height: 20px;
  font-weight: 500;
  padding: 20px 10px;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: #eeeeee;
  }
`;

export default ({
  onSubmitForm,
  onTextareaDesc,
  onTextareaName,
  onModalToggle,
  taskName,
  taskDesc,
  modalName,
  listId
}: IProps) => (
  <Modal modalClick={onModalToggle} containerStyles={ContainerStyles}>
    <ModalTitle>{`New ${modalName}`}</ModalTitle>
    <ModalForm>
      <ModalField>
        <Field
          name="Name"
          onChange={onTextareaName}
          value={taskName}
          autoFocus={true}
        />
      </ModalField>
      {listId && (
        <ModalField>
          <Field
            name="Description"
            onChange={onTextareaDesc}
            value={taskDesc}
            autoFocus={false}
          />
        </ModalField>
      )}
      <ModalFooter>
        <Button
          styles={ButtonModal}
          actionName={EConfirmModalForm.Cancel}
          onClick={onModalToggle}
          disabled={false}
        >
          Cancel
        </Button>
        <Button
          styles={ButtonModal}
          actionName={EConfirmModalForm.Create}
          onClick={onSubmitForm}
          disabled={false}
        >
          Create
        </Button>
      </ModalFooter>
    </ModalForm>
  </Modal>
);
