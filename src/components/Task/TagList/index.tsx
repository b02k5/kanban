import React, { useContext } from "react";

import Category from "../../Category";
import { ContextList } from "../../../utils/context";

import * as TagList from "./styles";

export default () => {
  const { category } = useContext(ContextList);
  return (
    <TagList.List>
      <TagList.Item>
        <Category>{category.value}</Category>
      </TagList.Item>
    </TagList.List>
  );
};
