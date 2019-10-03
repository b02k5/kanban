import React, { useContext } from "react";
import { useDispatch } from "react-redux";

import { toggleModal } from "../../../store/actions/modal";
import { ContextList } from "../../../utils/context";
import Task from "../../Task";
import { ButtonAdd, EAddNewComponent } from "../../Buttons";

import * as TaskList from "./styles";

export default ({ provided, snapshot }: any) => {
  const { tasks } = useContext(ContextList);

  const dispatch = useDispatch();

  return (
    <TaskList.Wrapper>
      <TaskList.Overflow>
        <TaskList.List isDraggingOver={snapshot.isDraggingOver}>
          {[...tasks].map((task, index) => (
            <TaskList.Item key={task.id}>
              <Task task={task} index={index} />
            </TaskList.Item>
          ))}
          {provided.placeholder}
        </TaskList.List>
      </TaskList.Overflow>
      <ButtonAdd
        actionName={EAddNewComponent.Task}
        onClick={() => dispatch(toggleModal())}
      >
        Add new task
      </ButtonAdd>
    </TaskList.Wrapper>
  );
};
