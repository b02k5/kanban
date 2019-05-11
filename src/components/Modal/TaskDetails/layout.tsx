import React from "react";
import styled from "styled-components";

import Modal from "../index";
import Field from "./Filed";

interface IProps {
  taskName: string;
  taskDesc: string;
  onSubmitForm: (e: any) => void;
  onTextareaName: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onTextareaDesc: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAddTask: () => void;
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
const AddTaskButton = styled.button`
  color: #36373a;
  border: 0;
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
const CancelTaskButton = styled.button`
  color: #9ba8b0;
  margin-right: 3px;
`;

export default ({
  onSubmitForm,
  onTextareaDesc,
  onTextareaName,
  onAddTask,
  onModalToggle,
  taskName,
  taskDesc
}: IProps) => (
  <Modal modalClick={onModalToggle} containerStyles={ContainerStyles}>
    <ModalTitle>New task</ModalTitle>
    <ModalForm onSubmit={onSubmitForm}>
      <ModalField>
        <Field
          name="Name"
          onChange={onTextareaName}
          value={taskName}
          autoFocus={true}
        />
      </ModalField>
      <ModalField>
        <Field
          name="Description"
          onChange={onTextareaDesc}
          value={taskDesc}
          autoFocus={false}
        />
      </ModalField>
      <ModalFooter>
        <CancelTaskButton as={AddTaskButton} onClick={onModalToggle}>
          Cancel
        </CancelTaskButton>
        <AddTaskButton onClick={onAddTask}>Create</AddTaskButton>
      </ModalFooter>
    </ModalForm>
  </Modal>
);
