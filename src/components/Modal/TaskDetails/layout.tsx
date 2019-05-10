import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";

import Modal from "../index";

interface IProps {
  onSubmitForm: (e: any) => void;
  onTextareaName: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onTextareaDesc: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAddTask: () => void;
  onModalToggle: () => void;
}

const ModalTitle = styled.div``;
const ModalName = styled.textarea``;
const ContainerStyles = styled.div``;

const ModalForm = styled.form``;
const AddTaskButton = styled.button``;

export default ({
  onSubmitForm,
  onTextareaDesc,
  onTextareaName,
  onAddTask,
  onModalToggle
}: IProps) => (
  <Modal modalClick={onModalToggle} containerStyles={ContainerStyles}>
    <ModalForm onSubmit={onSubmitForm}>
      <ModalTitle>Hello</ModalTitle>
      <ModalName onChange={onTextareaName} />
      <TextareaAutosize onChange={onTextareaDesc} />
      <AddTaskButton onClick={onAddTask} />
    </ModalForm>
  </Modal>
);
