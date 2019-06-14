import React, { useContext } from "react";

import { ContextList } from "../../../utils/context";
import * as More from "./styles";

export default () => {
  const { setIsTooltipOpen } = useContext(ContextList);

  return (
    <More.Main onClick={() => setIsTooltipOpen(true)}>
      <More.Circle />
    </More.Main>
  );
};
