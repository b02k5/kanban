import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

import Modal from "../../Modal";
import { TaskType } from "../../../store/types/tasks";
import {
  editTaskName,
  editTaskDescription
} from "../../../store/actions/tasks";

interface IDispatchToProps {
  editTaskName: (id: number, name: string) => void;
  editTaskDescription: (id: number, description: string) => void;
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

const TaskDetails: React.FunctionComponent<Props> = ({
  modalClick,
  task: { id, date, name, description },
  editTaskName,
  editTaskDescription
}): JSX.Element => (
  <Modal modalClick={modalClick} containerStyles={ContainerStyles}>
    <ModalTime>{date}</ModalTime>
    <TextareaAutosize
      style={{
        border: 0,
        color: "#212225",
        fontSize: "20px",
        lineHeight: "25px",
        fontWeight: 500,
        resize: "none",
        width: "100%",
        marginBottom: "18px"
      }}
      defaultValue={name}
      onChange={e => editTaskName(id, e.target.value)}
    />
    <TextareaAutosize
      style={{
        border: 0,
        color: "#4e4f53",
        fontSize: "14px",
        lineHeight: "19px",
        resize: "none",
        width: "100%"
      }}
      defaultValue={description}
      onChange={e => editTaskDescription(id, e.target.value)}
    />
  </Modal>
);

const mapDispatchToProps: IDispatchToProps = {
  editTaskName,
  editTaskDescription
};

export default connect(
  null,
  mapDispatchToProps
)(TaskDetails);
