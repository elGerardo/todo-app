import style from "./Header.module.css";
import { Container, Modal, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import buttons from "../../assets/global/buttons.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableCells, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
let CustomModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
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
              <button className={`${buttons.primary} mx-5`}>
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
