import React, { useContext } from "react";

import { ContextList } from "../../utils/context";

import * as Category from "./styles";

interface IProps {
  children: string;
}

export default ({ children }: IProps) => {
  const { category } = useContext(ContextList);
  return <Category.Tag categoryName={category.value}>{children}</Category.Tag>;
};
