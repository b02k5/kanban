import React, { useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";

import Modal from "../index";
import Field from "./Field";
import { Button, EAddNewComponent } from "../../Buttons";
import { EConfirmModalForm } from "../../Buttons";

import * as ModalAdd from "./styles";
import { AppState } from "../../../store";
import { CategoriesType } from "../../../store/types/categories";

interface IProps {
  name: EAddNewComponent;
  listId?: number;
  onModalToggle: () => void;
  action: ({  }: any) => void;
}

interface IState {
  taskName: string;
  taskDesc: string;
}

export default (props: IProps) => {
  const [fieldsForm, setFieldsForm] = useState<IState>({
    taskName: "",
    taskDesc: ""
  });
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const categories = useSelector<AppState, CategoriesType>(
    state => state.categories
  );

  const { listId, onModalToggle, action, name } = props;

  const submitFormHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (listId) {
      if (fieldsForm.taskName !== "") {
        e.preventDefault();
        action({
          listId: listId,
          name: fieldsForm.taskName,
          description: fieldsForm.taskDesc,
          category: selectedOption
        });
      }
    } else {
      if (fieldsForm.taskName !== "") {
        e.preventDefault();
        action({ name: fieldsForm.taskName });
      }
    }
  };

  return (
    <Modal modalClick={onModalToggle} containerStyles={ModalAdd.Container}>
      <ModalAdd.Title>{`New ${name}`}</ModalAdd.Title>
      <ModalAdd.Form>
        <ModalAdd.Field>
          <Field
            name="Name"
            onKeydown={(e: React.KeyboardEvent) => {
              e.keyCode === 13 && e.preventDefault();
            }}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setFieldsForm({
                ...fieldsForm,
                taskName: e.target.value
              })
            }
            value={fieldsForm.taskName}
            autoFocus={true}
          />
        </ModalAdd.Field>
        {name === EAddNewComponent.Task && (
          <ModalAdd.Field>
            <Field
              name="Description"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFieldsForm({
                  ...fieldsForm,
                  taskDesc: e.target.value
                })
              }
              value={fieldsForm.taskDesc}
              autoFocus={false}
            />
          </ModalAdd.Field>
        )}
        {name === EAddNewComponent.Task && (
          <Select
            value={selectedOption}
            onChange={(selectedOption: any) =>
              setSelectedOption(selectedOption)
            }
            options={categories}
            styles={{
              control: provided => ({
                ...provided,
                display: "flex",
                flexDirection: "row",
                border: "1px solid rgba(9,45,66,0.4)",
                borderRadius: "5px",
                cursor: "pointer",
                height: "34px"
              }),
              valueContainer: provided => ({
                ...provided,
                display: "flex",
                flexDirection: "row",
                fontSize: "15px",
                lineHeight: "20px",
                fontWeight: 500
              }),
              placeholder: () => ({
                fontSize: "15px",
                lineHeight: "20px",
                fontWeight: 500,
                color: "#36373a"
              })
            }}
            placeholder="Select category"
          />
        )}
        <ModalAdd.Footer>
          <Button
            styles={ModalAdd.Button}
            actionName={EConfirmModalForm.Cancel}
            onClick={onModalToggle}
            disabled={false}
          >
            Cancel
          </Button>
          <Button
            styles={ModalAdd.Button}
            actionName={EConfirmModalForm.Create}
            onClick={submitFormHandle}
            disabled={false}
          >
            Create
          </Button>
        </ModalAdd.Footer>
      </ModalAdd.Form>
    </Modal>
  );
};
