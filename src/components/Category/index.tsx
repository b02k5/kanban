import React, { useContext } from "react";

import { ContextTask } from "../../utils/context";

import * as Category from "./styles";

export default () => {
  const category = useContext(ContextTask);
  return (
    <Category.Tag categoryName={category.value}>{category.value}</Category.Tag>
  );
};
