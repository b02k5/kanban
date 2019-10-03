import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import Truncate from "react-truncate";

import { TaskType } from "../../store/types/tasks";
import TaskDetails from "../Modal/TaskDetails";
import CategoriesList from "./CategoriesList";

import * as Task from "./styles";
import { ContextTask } from "../../utils/context";

interface IProps {
  task: TaskType;
  index: number;
}

export default (props: IProps) => {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState<boolean>(false);
  const {
    task: { id, date, name, description, category },
    index
  } = props;

  return (
    <ContextTask.Provider value={category}>
      <Draggable draggableId={`${id}`} index={index}>
        {(provided, snapshot) => (
          <Task.Main
            draggable={true}
            onClick={() => setIsModalDetailOpen(prevState => !prevState)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Task.Time>{date}</Task.Time>
            <Task.Name>
              <Truncate lines={2} ellipsis="..." width={200}>
                {name}
              </Truncate>
            </Task.Name>
            {description && (
              <Task.Description>
                <Truncate lines={3} ellipsis="..." width={200}>
                  {description}
                </Truncate>
              </Task.Description>
            )}
            {category && (
              <Task.Footer>
                <CategoriesList />
              </Task.Footer>
            )}
          </Task.Main>
        )}
      </Draggable>
      {isModalDetailOpen && (
        <TaskDetails
          task={{ id, date, name, description, category }}
          modalClick={() => setIsModalDetailOpen(prevState => !prevState)}
        />
      )}
    </ContextTask.Provider>
  );
};
