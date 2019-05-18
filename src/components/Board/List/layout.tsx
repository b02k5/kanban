import React from "react";
import styled from "styled-components";
import ReactSVG from "react-svg";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { IList } from "../../../store/types/lists";
import Task from "../Task";
import { TaskType } from "../../../store/types/tasks";
import AddModal from "../../Modal/Add/index";

import plusCircle from "../../../assets/images/svg/plus-circle.svg";

interface IProps {
  list: IList;
  tasks: TaskType[];
  taskName: string;
  isAddTaskInputOpen: boolean;
  addItemInputRef: React.RefObject<HTMLInputElement>;
  isModalOpen: boolean;
  index: number;
  onSetTaskName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveList: (listId: number, tasks: Array<number>) => void;
  onEditNameList: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    listId: number
  ) => void;
  onModalToggle: () => void;
  onAddTask: ({  }: any) => void;
}

const List = styled.li`
  margin-right: 25px;
  flex: 0 0 auto;
`;

const Wrapper = styled.div`
  position: relative;
  width: 280px;
`;

const Header = styled.div`
  position: relative;
  height: 30px;
  padding-left: 10px;
  margin-bottom: 13px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: red;
`;
const Name = styled.textarea`
  color: #36373a;
  font-size: 22px;
  line-height: 27px;
  font-weight: bold;
  width: 100%;
  height: 30px;
  margin: 0;
  padding: 0;
  border: 0;
  border-bottom: 1px solid transparent;
  background-color: transparent;
  outline: none;
  resize: none;
  transition: 0.1s;
  &:focus,
  &:hover {
    border-bottom: 1px solid rgba(18, 33, 68, 0.15);
  }
`;
const RemoveList = styled.button`
  margin: 0;
  padding: 0;
  width: 25px;
  height: 30px;
  border: 0;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
  transition: 0.15s;
  &:hover {
    background-color: rgba(78, 79, 83, 0.1);
  }
`;

const RemoveListCircle = styled.span`
  position: relative;
  display: block;
  width: 4px;
  height: 4px;
  background-color: #9d9d9f;
  border-radius: 50%;
  &::before,
  &::after {
    content: "";
    left: 0;
    position: absolute;
    width: 4px;
    height: 4px;
    background-color: #9d9d9f;
    border-radius: 50%;
  }
  &::before {
    top: -6px;
  }
  &::after {
    top: 6px;
  }
`;

const AddTask = styled.button`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #9ba8b0;
  font-size: 12px;
  line-height: 18px;
  font-weight: 500;
  width: 100%;
  padding: 15px 53px;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.15s;
  background-color: rgba(255, 255, 255, 0.5);
  &:hover {
    color: #3d3f43;
    background-color: #dde1e7;
  }
`;

const Tasks = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;
const TasksItem = styled.li`
  width: 100%;
  &:last-child {
    margin-bottom: 0;
  }
`;

export default ({
  list,
  onRemoveList,
  onEditNameList,
  tasks,
  onModalToggle,
  isModalOpen,
  onAddTask,
  index
}: IProps): JSX.Element => (
  <Draggable draggableId={`${list.id}`} index={index}>
    {(provided: any) => (
      <List
        id={`${list.id}`}
        {...provided.draggableProps}
        ref={provided.innerRef}
      >
        <Wrapper>
          <Header {...provided.dragHandleProps}>
            <Name
              onChange={e => onEditNameList(e, list.id)}
              defaultValue={list.name}
            />
            <RemoveList onClick={() => onRemoveList(list.id, list.tasks)}>
              <RemoveListCircle />
            </RemoveList>
          </Header>
          <Droppable key={list.id} droppableId={`${list.id}`} type="task">
            {(provided: any) => (
              <Tasks {...provided.droppableProps} ref={provided.innerRef}>
                {[...tasks].map((task, index) => (
                  <TasksItem key={task.id}>
                    <Task task={task} index={index} />
                  </TasksItem>
                ))}
                {provided.placeholder}
              </Tasks>
            )}
          </Droppable>
          <AddTask onClick={onModalToggle}>
            <ReactSVG
              src={plusCircle}
              svgStyle={{
                position: "absolute",
                top: "50%",
                left: 30,
                transform: "translateY(-50%)",
                width: 15,
                height: 15,
                fill: "#9ba8b0"
              }}
            />
            Add new item
          </AddTask>
        </Wrapper>
        {isModalOpen && (
          <AddModal
            modalName="task"
            action={onAddTask}
            listId={list.id}
            onModalToggle={onModalToggle}
          />
        )}
      </List>
    )}
  </Draggable>
);
