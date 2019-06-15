import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import Truncate from "react-truncate";
import { connect } from "react-redux";

import { TaskArguments } from "../../store/types/tasks";
import { addTask } from "../../store/actions/tasks";
import { TaskType } from "../../store/types/tasks";
import TaskDetails from "../Modal/TaskDetails";

import * as TaskLayout from "./styles";

interface IDispatchProps {
  addTask: ({  }: TaskArguments) => void;
}

interface IProps {
  task: TaskType;
  index: number;
}

type Props = IDispatchProps & IProps;

const Task: React.FunctionComponent<Props> = props => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { task, index } = { ...props };

  return (
    <>
      <Draggable draggableId={`${task.id}`} index={index}>
        {(provided, snapshot) => (
          <TaskLayout.Main
            draggable={true}
            onClick={() => setIsModalOpen(prevState => !prevState)}
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
      {isModalOpen && (
        <TaskDetails
          task={task}
          modalClick={() => setIsModalOpen(prevState => !prevState)}
        />
      )}
    </>
  );
};

const mapDispatchToProps: IDispatchProps = {
  addTask
};

export default connect(
  null,
  mapDispatchToProps
)(Task);
