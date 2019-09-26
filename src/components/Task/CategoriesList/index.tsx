import React from "react";

import Category from "../../Category";

import * as CategoriesList from "./styles";

export default () => {
  return (
    <CategoriesList.List>
      <CategoriesList.Item>
        <Category />
      </CategoriesList.Item>
    </CategoriesList.List>
  );
};
