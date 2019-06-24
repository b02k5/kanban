import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import Truncate from "react-truncate";

import { TaskType } from "../../store/types/tasks";
import TaskDetails from "../Modal/TaskDetails";
import CategoriesList from "./CategoriesList";

import * as Task from "./styles";
import { ContextList } from "../../utils/context";

interface IProps {
  task: TaskType;
  index: number;
}

export default (props: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { task, index } = props;

  return (
    <ContextList.Provider value={{ category: task.category }}>
      <Draggable draggableId={`${task.id}`} index={index}>
        {(provided, snapshot) => (
          <Task.Main
            draggable={true}
            onClick={() => setIsModalOpen(prevState => !prevState)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Task.Time>{task.date}</Task.Time>
            <Task.Name>
              <Truncate lines={2} ellipsis="..." width={200}>
                {task.name}
              </Truncate>
            </Task.Name>
            {task.description && (
              <Task.Description>
                <Truncate lines={3} ellipsis="..." width={200}>
                  {task.description}
                </Truncate>
              </Task.Description>
            )}
            {task.category && (
              <Task.Footer>
                <CategoriesList />
              </Task.Footer>
            )}
          </Task.Main>
        )}
      </Draggable>
      {isModalOpen && (
        <TaskDetails
          task={task}
          modalClick={() => setIsModalOpen(prevState => !prevState)}
        />
      )}
    </ContextList.Provider>
  );
};
