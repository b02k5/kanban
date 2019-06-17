import React, { useState } from "react";

import Modal from "../index";
import Field from "./Field";
import { Button } from "../../Buttons";
import { EConfirmModalForm } from "../../Buttons";

import * as ModalAdd from "./styles";

interface IProps {
  listId?: number;
  modalName: string;
  onModalToggle: () => void;
  action: ({  }: any) => void;
}

interface IState {
  taskName: string;
  taskDesc: string;
}

export default (props: IProps) => {
  const { listId, onModalToggle, modalName, action } = props;
  const [fieldsForm, setFieldsForm] = useState<IState>({
    taskName: "",
    taskDesc: ""
  });

  const submitFormHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (listId) {
      if (fieldsForm.taskName && fieldsForm.taskDesc !== "") {
        e.preventDefault();
        action({
          listId: listId,
          name: fieldsForm.taskName,
          description: fieldsForm.taskDesc
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
      <ModalAdd.Title>{`New ${modalName}`}</ModalAdd.Title>
      <ModalAdd.Form>
        <ModalAdd.Field>
          <Field
            name="Name"
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
        {listId && (
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
