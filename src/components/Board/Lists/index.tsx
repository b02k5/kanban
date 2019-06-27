import React from "react";
import { Droppable } from "react-beautiful-dnd";

import List from "../../List";
import { IList } from "../../../store/types/lists";

import * as Lists from "./styles";

interface IProps {
  lists: IList[];
  boardId: number;
}

export default ({ lists, boardId }: IProps) => (
  <Droppable
    droppableId={`${boardId}`}
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
              boardId={boardId}
            />
          </Lists.Item>
        ))}
        {provided.placeholder}
      </Lists.List>
    )}
  </Droppable>
);
