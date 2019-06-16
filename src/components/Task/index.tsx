import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import Truncate from "react-truncate";

import { TaskType } from "../../store/types/tasks";
import TaskDetails from "../Modal/TaskDetails";
import TagList from "./TagList";

import * as Task from "./styles";

interface IProps {
  task: TaskType;
  index: number;
}

export default (props: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { task, index } = { ...props };

  return (
    <>
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
            <Task.Name isDragging={snapshot.isDragging}>{task.name}</Task.Name>
            <Task.Description isDragging={snapshot.isDragging}>
              <Truncate lines={4} ellipsis="..." width={210}>
                {task.description}
              </Truncate>
            </Task.Description>
            <Task.Footer>
              <TagList />
            </Task.Footer>
          </Task.Main>
        )}
      </Draggable>
      {isModalOpen && (
        <TaskDetails
          task={task}
          modalClick={() => setIsModalOpen(prevState => !prevState)}
        />
      )}
    </>
  );
};
