import React from "react";
import { Draggable } from "react-beautiful-dnd";
import Truncate from "react-truncate";

import { TaskType } from "../../store/types/tasks";
import TaskDetails from "../Modal/TaskDetails";

import * as TaskLayout from "./styles";

interface IProps {
  task: TaskType;
  isModalOpen: boolean;
  index: number;
  onModalToggle: () => void;
}

export default ({ task, isModalOpen, onModalToggle, index }: IProps) => (
  <>
    <Draggable draggableId={`${task.id}`} index={index}>
      {(provided, snapshot) => (
        <TaskLayout.Main
          draggable={true}
          onClick={onModalToggle}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <TaskLayout.Time>{task.date}</TaskLayout.Time>
          <TaskLayout.Name isDragging={snapshot.isDragging}>
            {task.name}
          </TaskLayout.Name>
          <TaskLayout.Description isDragging={snapshot.isDragging}>
            <Truncate lines={4} ellipsis="..." width={210}>
              {task.description}
            </Truncate>
          </TaskLayout.Description>
          <TaskLayout.Footer>
            <TaskLayout.TagLists>
              <TaskLayout.TagItem>
                <TaskLayout.Tag>UI</TaskLayout.Tag>
              </TaskLayout.TagItem>
            </TaskLayout.TagLists>
          </TaskLayout.Footer>
        </TaskLayout.Main>
      )}
    </Draggable>
    {isModalOpen && <TaskDetails task={task} modalClick={onModalToggle} />}
  </>
);
