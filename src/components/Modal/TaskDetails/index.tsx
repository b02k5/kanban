import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import ResizableTextarea from "../../ResizableTextarea";

import Modal from "../../Modal";
import { TaskType } from "../../../store/types/tasks";
import {
  editTaskName,
  editTaskDescription
} from "../../../store/actions/tasks";

interface IDispatchToProps {
  editTaskName: (name: string, id: number) => void;
  editTaskDescription: (description: string, id: number) => void;
}

interface IProps {
  task: TaskType;
  modalClick: () => void;
}

type Props = IDispatchToProps & IProps;

const ModalTime = styled.time`
  color: #9ba8b0;
  font-size: 12px;
  margin-bottom: 3px;
  display: inline-block;
`;

const ContainerStyles = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 510px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 30px;
`;

const Name = styled.textarea`
  border: 0;
  color: #212225;
  font-size: 20px;
  line-height: 25px;
  font-weight: 500;
  resize: none;
  width: 100%;
  margin-bottom: 18px;
`;

const Description = styled.textarea`
  border: 0;
  color: #4e4f53;
  font-size: 14px;
  line-height: 19px;
  resize: none;
  width: 100%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 0 10px 0 10px;
  background-color: #ffffff;
  border: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: rgb(78, 79, 83);
  transition: 0.15s;
  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 17px;
    height: 2px;
    border-radius: 7px;
    background-color: white;
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
`;

const TaskDetails: React.FunctionComponent<Props> = ({
  modalClick,
  task: { id, date, name, description },
  editTaskName,
  editTaskDescription
}) => {
  const handleEditTaskName = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    id: number
  ) => {
    editTaskName(e.target.value, id);
  };

  const handleEditTaskDesc = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    id: number
  ) => {
    editTaskDescription(e.target.value, id);
  };

  return (
    <Modal modalClick={modalClick} containerStyles={ContainerStyles}>
      <ModalTime>{date}</ModalTime>
      <ResizableTextarea
        maxRows={4}
        lineHeight={25}
        onChange={handleEditTaskName}
        value={name}
        elementId={id}
        style={Name}
        placeholder="Task name"
      />
      <ResizableTextarea
        maxRows={10}
        lineHeight={19}
        onChange={handleEditTaskDesc}
        value={description}
        elementId={id}
        style={Description}
        placeholder="Add description..."
      />
      <CloseButton onClick={modalClick} />
    </Modal>
  );
};
const mapDispatchToProps: IDispatchToProps = {
  editTaskName,
  editTaskDescription
};

export default connect(
  null,
  mapDispatchToProps
)(TaskDetails);
