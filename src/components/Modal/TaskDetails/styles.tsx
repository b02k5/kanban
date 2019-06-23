import styled from "styled-components";
import Textarea from "react-textarea-autosize";

export const Time = styled.time`
  color: #9ba8b0;
  font-size: 12px;
  margin-bottom: 3px;
  display: inline-block;
`;

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 510px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 30px;
`;

export const Name = styled(Textarea)`
  border: 0;
  color: #212225;
  font-size: 20px;
  line-height: 25px;
  font-weight: 500;
  resize: none;
  width: 100%;
  margin-bottom: 18px;
  border: 2px solid transparent;
  border-radius: 5px;
  transition: 0.12s;
  &:focus {
    border-color: #8ab8db;
  }
`;

export const Description = styled(Textarea)`
  border: 0;
  color: #4e4f53;
  font-size: 14px;
  line-height: 19px;
  resize: none;
  width: 100%;
  border: 2px solid transparent;
  border-radius: 5px;
  transition: 0.12s;
  &:focus {
    border-color: #8ab8db;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 0 10px 0 10px;
  background-color: #ffffff;
  border: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: rgb(78, 79, 83);
  transition: 0.15s;
  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 17px;
    height: 2px;
    border-radius: 7px;
    background-color: white;
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
`;
