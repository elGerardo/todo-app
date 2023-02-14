import buttons from "../../assets/global/buttons.module.css";

import Note from "./Note";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky, faList } from "@fortawesome/free-solid-svg-icons";

export let CustomModal = (props) => {
  let [itemType, setItemType] = useState("Note");

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Note/List</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`position-relative`}>
        <div className={`position-absolute top-0 end-0 m-3`}>
          <button
            onClick={() => setItemType("Note")}
            className={`${buttons.primary} ${
              itemType == "Note" ? buttons.primary_selected : null
            } px-3 py-2`}
          >
            <FontAwesomeIcon icon={faNoteSticky} />
          </button>
          <button
            onClick={() => setItemType("List")}
            className={`${buttons.primary} ${
              itemType == "List" ? buttons.primary_selected : null
            } px-3 py-2 ms-3`}
          >
            <FontAwesomeIcon icon={faList} />
          </button>
        </div>
        <div>
          <Note
            itemType={itemType}
            emititems={(items) => {
              props.emititems(items);
            }}
            emitreload={(value) => {
              props.emitreload(value);
            }}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};
