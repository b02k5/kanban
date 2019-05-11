import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";

import Modal from "../index";

interface IProps {
  isNameFocused: boolean;
  onSubmitForm: (e: any) => void;
  onTextareaName: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onTextareaDesc: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAddTask: () => void;
  onModalToggle: () => void;
  onInputFocus: () => void;
  onInputBlur: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
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
const ModalField = styled.div`
  position: relative;
  margin-bottom: 25px;
`;

const ModalLabel = styled.label<{ isNameFocused: boolean }>`
  position: absolute;
  top: 7px;
  left: 7px;
  color: #36373a;
  display: block;
  transition: 0.2s;
`;

const ModalName = styled.textarea`
  width: 100%;
  height: 30px;
  font-size: 15px;
  padding: 5px 7px;
  outline: none;
  border: 0;
  border-bottom: 1px solid rgba(9, 45, 66, 0.4);
  transition: 0.1s;
  resize: none;
  &:focus {
    border-color: rgba(9, 45, 66, 0.8);
  }
`;
const ModalForm = styled.form``;
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
`;

export default ({
  onSubmitForm,
  onTextareaDesc,
  onTextareaName,
  onAddTask,
  onModalToggle,
  onInputFocus,
  onInputBlur,
  isNameFocused
}: IProps) => (
  <Modal modalClick={onModalToggle} containerStyles={ContainerStyles}>
    <ModalTitle>Hello</ModalTitle>
    <ModalForm onSubmit={onSubmitForm}>
      <ModalField>
        <ModalLabel isNameFocused={isNameFocused}>Name</ModalLabel>
        <ModalName
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          onChange={onTextareaName}
        />
      </ModalField>
      <ModalField>
        <TextareaAutosize
          onChange={onTextareaDesc}
          style={{
            border: 0,
            borderBottom: "1px solid rgba(9, 45, 66, 0.4)",
            color: "#122144",
            fontSize: "15px",
            lineHeight: "20px",
            resize: "none",
            width: "100%",
            minHeight: "30px",
            padding: "5px 7px",
            outline: "none"
          }}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
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
