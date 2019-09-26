import React, { useContext } from "react";

import { ContextList } from "../../utils/context";

import * as Category from "./styles";

export default () => {
  const { category } = useContext(ContextList);
  return (
    <Category.Tag categoryName={category.value}>{category.value}</Category.Tag>
  );
};
