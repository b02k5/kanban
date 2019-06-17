import styled from "styled-components";
import { EConfirmModalForm } from "../../Buttons";

export const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 425px;
  height: 100vh;
  padding: 65px 35px;
  background-color: #fefefe;
`;

export const Title = styled.h1`
  font-size: 40px;
  font-weight: 45px;
  font-weight: bold;
  margin: 0 0 90px 0;
  color: #36373a;
`;

export const Form = styled.form``;

export const Field = styled.div`
  position: relative;
  margin-bottom: 25px;
`;

export const Footer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background-color: white;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.1);
  padding: 0 35px;
`;

export const Button = styled.button<{ actionName: EConfirmModalForm }>`
  color: ${props =>
    props.actionName === EConfirmModalForm.Cancel ? "#9ba8b0" : "#36373a"};
  text-transform: uppercase;
  font-size: 15px;
  line-height: 20px;
  font-weight: 500;
  padding: 20px 10px;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: #eeeeee;
  }
`;
