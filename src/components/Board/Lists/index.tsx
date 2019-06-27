import React, { useContext } from "react";
import { Droppable } from "react-beautiful-dnd";

import List from "../../List";
import { IList } from "../../../store/types/lists";

import * as Lists from "./styles";
import { ContextBoard } from "../../../utils/context";

interface IProps {
  lists: IList[];
}

export default ({ lists }: IProps) => {
  const { boardId } = useContext(ContextBoard)
  return (
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
              />
            </Lists.Item>
          ))}
          {provided.placeholder}
        </Lists.List>
      )}
    </Droppable>
  )
};
