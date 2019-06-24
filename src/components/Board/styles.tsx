import styled from "styled-components";

export const Main = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  margin-bottom: 15px;
  padding: 10px 30px;
  background-color: #fdfdfd;
  border-bottom: 1px solid #d9d8da;
`;

export const Name = styled.h1`
  color: #3d3f43;
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  margin: 0;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 15px;
  display: flex;
  overflow-x: scroll;
`;

export const AddList = styled.div`
  flex: 0 0 auto;
  width: 270px;
  margin-left: 15px;
`;
