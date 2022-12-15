import style from "./Header.module.css";
import { Container, Modal, Button, Form } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import buttons from "../../assets/global/buttons.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableCells,
  faPlus,
  faNoteSticky,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Tasks } from "../../services/Tasks";

let createTask = async () => {
  let [isLoading, setIsLoading] = useState(false);

  setIsLoading(true);
  let data = {
    title: title,
    description: description,
    type: type,
    items: null,
  };

  let login = JSON.parse(localStorage.getItem("login"));

  await new Tasks().create(data, login.user_id).then((response) => {
    if (response.status == 0) {
      setIsLoading(false);
      return;
    }
  });
};

let useField = ({ type, required, as, placeholder }) => {
  let [value, setValue] = useState("");

  let onChange = (e) => {
    setValue(e.target.value);
  };

  return { type, onChange, required, value, as, placeholder };
};

let Note = () => {
  let title = useField({ type: "text", placeholder: "Write a title..." });
  let description = useField({
    as: "textarea",
    required: false,
    placeholder: "Write a description...",
  });

  let content = (
    <div>
      <h2>Note</h2>
      <Form className={`mt-5`}>
        <Form.Group>
          <Form.Control
            className={`${style.control} `}
            {...title}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            className={`${style.control} my-3`}
            {...description}
          ></Form.Control>
        </Form.Group>
      </Form>
    </div>
  );

  return content;
};

let CustomModal = (props) => {
  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Note/List</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`position-relative`}>
        <div className={`position-absolute top-0 end-0 m-3`}>
          <button className={`${buttons.primary} px-3 py-2`}>
            <FontAwesomeIcon icon={faNoteSticky} />
          </button>
          <button className={`${buttons.primary} px-3 py-2 ms-3`}>
            <FontAwesomeIcon icon={faList} />
          </button>
        </div>
        <div>
          <Note />
          <div className={`d-flex flex-row-reverse`}>
            <button className={`${buttons.primary} ms-3 px-3 py-2`}>
              Finish
            </button>
            <button className={`${buttons.secondary} bg-white px-3 py-2`}>
              Cancel
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

let Header = () => {
  const [modalShow, setModalShow] = useState(false);

  let content = (
    <header className={`${style.header} position-fixed top-0 w-100`}>
      <Container className={`d-flex justify-content-between py-3`}>
        <Link to="/" className={`d-inline`}>
          Login
        </Link>
        <div>
          {useLocation().pathname !== "/dashboard" ? (
            <div>
              <Link
                to="login"
                className={`${buttons.secondary} ${buttons.header_style} d-inline`}
              >
                Login
              </Link>
              <Link
                to="signin"
                className={`${buttons.primary} ${buttons.header_style} d-inline mx-5`}
              >
                Create Account
              </Link>
            </div>
          ) : (
            <div>
              <button
                className={`${buttons.primary}`}
                onClick={() => setModalShow(true)}
              >
                <FontAwesomeIcon icon={faPlus} /> Add
              </button>

              <CustomModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
              <button className={`${buttons.primary} ms-5`}>
                <FontAwesomeIcon icon={faTableCells} /> Order
              </button>
            </div>
          )}
        </div>
      </Container>
    </header>
  );

  return content;
};

export default Header;
