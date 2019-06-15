import React, { useContext } from "react";

import { ContextList } from "../../../utils/context";
import Task from "../../Task";
import { AddButton } from "../../Buttons";

import * as TaskList from "./styles";

export default ({ provided, snapshot }: any) => {
  const { tasks, modalToggleHandle } = useContext(ContextList);
  return (
    <TaskList.Wrapper>
      <TaskList.List isDraggingOver={snapshot.isDraggingOver}>
        {[...tasks].map((task, index) => (
          <TaskList.Item key={task.id}>
            <Task task={task} index={index} />
          </TaskList.Item>
        ))}
        {provided.placeholder}
      </TaskList.List>
      <AddButton name="Add new task" action="task" click={modalToggleHandle} />
    </TaskList.Wrapper>
  );
};
