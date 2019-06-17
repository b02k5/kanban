import React from "react";
import { useDispatch } from "react-redux";

import Modal from "../../Modal";
import { TaskType } from "../../../store/types/tasks";
import {
  editTaskName,
  editTaskDescription
} from "../../../store/actions/tasks";

import * as TaskDetails from "./styles";

interface IProps {
  task: TaskType;
  modalClick: () => void;
}

export default ({
  modalClick,
  task: { id, date, name, description }
}: IProps) => {
  const dispatch = useDispatch();

  return (
    <Modal modalClick={modalClick} containerStyles={TaskDetails.Container}>
      <TaskDetails.Time>{date}</TaskDetails.Time>
      <TaskDetails.Name
        maxRows={3}
        onChange={e => dispatch(editTaskName(e.target.value, id))}
        value={name}
        placeholder="Task name"
      />
      <TaskDetails.Description
        maxRows={10}
        onChange={e => dispatch(editTaskDescription(e.target.value, id))}
        value={description}
        placeholder="Add description..."
      />
      <TaskDetails.CloseButton onClick={modalClick} />
    </Modal>
  );
};
