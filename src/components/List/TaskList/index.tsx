import React, { useContext } from "react";

import { ContextList } from "../../../utils/context";
import Task from "../../Task";
import { ButtonAdd, EActionName } from "../../Buttons";

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
      <ButtonAdd
        actionName={EActionName.Task}
        onClick={openModalHandle}
        disabled={false}
      >
        Add new task
      </ButtonAdd>
    </TaskList.Wrapper>
  );
};
