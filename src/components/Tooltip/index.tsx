import React, { useEffect, useContext, useRef } from "react";

import { ContextList } from "../../utils/context";
import * as Tooltip from "./styles";

export default ({ items, listName }: any): JSX.Element => {
  const { setIsTooltipOpen } = useContext(ContextList);

  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", clickOutsideHandle);

    return () => {
      document.removeEventListener("click", clickOutsideHandle);
    };
  }, []);

  const clickOutsideHandle = (event: MouseEvent) => {
    const node = tooltipRef.current;
    if ((node && !node.contains(event.target as Node)) || node === null) {
      setIsTooltipOpen(false);
    }
  };

  return (
    <Tooltip.Main ref={tooltipRef}>
      <Tooltip.Name>List Actions</Tooltip.Name>
      <Tooltip.List>
        {items
          .filter((item: any, index: number) =>
            listName === "Done" ? item : index !== 0
          )
          .map((item: any, index: number) => (
            <Tooltip.Item key={index}>
              <Tooltip.Button onClick={item.action}>{item.name}</Tooltip.Button>
            </Tooltip.Item>
          ))}
      </Tooltip.List>
    </Tooltip.Main>
  );
};
