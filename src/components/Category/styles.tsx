import styled from "styled-components";
import { ECategories } from "../../store/types/categories";

export const Tag = styled.span<{ categoryName: string }>`
  color: white;
  font-size: 13px;
  line-height: 18px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 20px;
  background-color: ${props => {
    switch (props.categoryName) {
      case ECategories.UI:
        return "#b7f5de";
      case ECategories.UX:
        return "#add2fc";
      case ECategories.Color:
        return "#fee5b9";
      case ECategories.Animation:
        return "#86dfd6";
      case ECategories.Illustration:
        return "#e2addd";
      default:
        return "#000000";
    }
  }};
`;
