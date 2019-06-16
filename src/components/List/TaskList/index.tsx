import React, { useContext } from "react";

import { ContextList } from "../../../utils/context";
import Task from "../../Task";
import { AddButton } from "../../Buttons";

import * as TaskList from "./styles";

export default ({ provided, snapshot }: any) => {
  const { tasks, openModalHandle } = useContext(ContextList);
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
      <AddButton actionName="task" onClick={openModalHandle}>
        Add new task
      </AddButton>
    </TaskList.Wrapper>
  );
};
