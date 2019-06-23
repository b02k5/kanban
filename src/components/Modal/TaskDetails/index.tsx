import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../../Modal";
import { TaskType } from "../../../store/types/tasks";
import {
  editTaskName,
  editTaskDescription
} from "../../../store/actions/tasks";
import { CategoriesType } from "../../../store/types/categories";
import { AppState } from "../../../store";
import { setCategory } from "../../../store/actions/categories";

import * as TaskDetails from "./styles";

interface IProps {
  task: TaskType;
  modalClick: () => void;
}

export default ({
  modalClick,
  task: { id, date, name, description, category }
}: IProps) => {
  const categories = useSelector<AppState, CategoriesType>(
    state => state.categories
  );
  const dispatch = useDispatch();
  const refName = useRef<HTMLTextAreaElement>(null);
  const refDesc = useRef<HTMLTextAreaElement>(null);

  const [detailField, setDetailField] = useState({
    name,
    description
  });

  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  } | null>(category);

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
    return (
      element.value === "" &&
      ((element.value = name),
      setDetailField({
        ...detailField,
        name: name
      }))
    );
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

      node &&
        target.value !== name &&
        dispatch(editTaskName(detailField.name, id));
    } else {
      node &&
        e.target.value !== description &&
        dispatch(editTaskDescription(node.value, id));
    }
  };

  const selectedOptionHandle = (selectedOption: any) => {
    setSelectedOption(selectedOption);
    dispatch(
      setCategory({
        value: selectedOption.value,
        label: selectedOption.label,
        taskId: id
      })
    );
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
      <Select
        value={selectedOption}
        onChange={selectedOptionHandle}
        options={categories}
      />
      <TaskDetails.CloseButton onClick={modalClick} />
    </Modal>
  );
};
