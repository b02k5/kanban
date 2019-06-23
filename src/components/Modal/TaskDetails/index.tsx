import React, { useState, useRef, useEffect } from "react";
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
  const refName = useRef<HTMLTextAreaElement>(null);
  const refDesc = useRef<HTMLTextAreaElement>(null);

  const [detailField, setDetailField] = useState({
    name,
    description
  });

  const setFieldValueHandle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target === refName.current) {
      setDetailField({
        ...detailField,
        name: e.target.value
      });
    } else {
      setDetailField({
        ...detailField,
        description: e.target.value
      });
    }
  };

  const checkNameForEmptiness = (element: HTMLTextAreaElement) => {
    return element.value === "" && (element.value = name);
  };

  const setFieldBlur = (
    e: React.FocusEvent<HTMLTextAreaElement>,
    refTextarea: React.RefObject<HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const node = refTextarea.current;
    node && node.blur();

    if (target === refName.current) {
      checkNameForEmptiness(target);

      if (node && target.value !== name && target.value !== "") {
        dispatch(editTaskName(detailField.name, id));
      }
    } else {
      node &&
        e.target.value !== description &&
        dispatch(editTaskDescription(node.value, id));
    }
  };

  return (
    <Modal modalClick={modalClick} containerStyles={TaskDetails.Container}>
      <TaskDetails.Time>{date}</TaskDetails.Time>
      <TaskDetails.Name
        maxRows={3}
        onChange={e => setFieldValueHandle(e)}
        value={detailField.name}
        placeholder="Task name"
        onBlur={e => setFieldBlur(e, refName)}
        inputRef={refName}
      />
      <TaskDetails.Description
        maxRows={10}
        onChange={e => setFieldValueHandle(e)}
        value={detailField.description}
        placeholder="Add description..."
        onBlur={e => setFieldBlur(e, refDesc)}
        inputRef={refDesc}
      />
      <TaskDetails.CloseButton onClick={modalClick} />
    </Modal>
  );
};
