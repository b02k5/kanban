import React, { useContext } from "react";

import Category from "../../Category";
import { ContextList } from "../../../utils/context";

import * as CategoriesList from "./styles";

export default () => {
  const { category } = useContext(ContextList);
  return (
    <CategoriesList.List>
      <CategoriesList.Item>
        <Category>{category.value}</Category>
      </CategoriesList.Item>
    </CategoriesList.List>
  );
};
