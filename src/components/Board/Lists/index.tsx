import React from "react";
import { Droppable } from "react-beautiful-dnd";

import List from "../../List";
import { IList } from "../../../store/types/lists";
import { BoardType } from "../../../store/types/boards";

import * as Lists from "./styles";

interface IProps {
  activeBoard: BoardType | undefined;
  lists: IList[];
}

export default ({ lists, activeBoard }: IProps) => (
  <Droppable
    droppableId={`${activeBoard ? activeBoard.id : 0}`}
    direction="horizontal"
    type="list"
  >
    {(provided: any) => (
      <Lists.List {...provided.droppableProps} ref={provided.innerRef}>
        {[...lists].map((list, index) => (
          <Lists.Item key={list.id}>
            <List
              index={index}
              list={list}
              boardId={activeBoard ? activeBoard.id : 0}
            />
          </Lists.Item>
        ))}
        {provided.placeholder}
      </Lists.List>
    )}
  </Droppable>
);
