import style from "./Dashboard.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { Container, Modal, Form, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import buttons from "../../assets/global/buttons.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableCells,
  faPlus,
  faNoteSticky,
  faList,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Tasks } from "../../services/Tasks";

//customStates
let useField = ({ type, required, as, placeholder }) => {
  let [value, setValue] = useState("");

  let onChange = (e) => {
    setValue(e.target.value);
  };

  return { type, onChange, required, value, as, placeholder };
};

//components
let Note = (props) => {
  let [isCloseModal, setIsCloseModal] = useState(false);
  let [checkboxes, setCheckboxes] = useState([]);
  let [checkboxesLength, setCheckboxesLength] = useState(0);
  let [missingTitleMessage, setMissingTitleMessage] = useState("");
  let title = useField({ type: "text", placeholder: "Write a title..." });
  let description = useField({
    as: "textarea",
    required: false,
    placeholder: "Write a description...",
  });

  let createTask = async (e) => {
    e.preventDefault();

    if (isCloseModal) {
      props.emititems(null);
      return;
    }

    if (title.value === "") {
      setMissingTitleMessage("Please fill up title field.");
      return;
    }

    let postData = {
      title: title.value,
      description: description.value,
      type: props.itemType,
      items: checkboxesLength > 0 ? checkboxes : null,
    };

    let user_id = null;

    //if is loged
    if (JSON.parse(localStorage.getItem("login")) != null) {
      user_id = JSON.parse(localStorage.getItem("login")).user_id;
      await new Tasks().create(postData, user_id).then((response) => {
        if (response.status == 0) {
          return;
        }
      });
      return;
    }

    //if is not loged
    let localData = localStorage.getItem("tasks");
    if (localData != null) {
      let data = JSON.parse(localData);
      data.push(postData);
      localStorage.setItem("tasks", JSON.stringify(data));
    } else {
      localStorage.setItem("tasks", JSON.stringify([postData]));
    }

    let emitItems = JSON.parse(localStorage.getItem("tasks"));
    props.emititems(emitItems);
    return;
  };

  let updateCheckboxes = (index, value) => {
    let item = checkboxes;

    //delete old values
    if (value == "" && item.length === index + 1) {
      item.splice(index, 1);
      setCheckboxes(item);
      setCheckboxesLength(item.length);
      return;
    }

    let itemObject = { index: index, text: value, status: 0 };
    //update old values
    if (item.length - 1 >= index) {
      item[index] = itemObject;
      setCheckboxesLength(item.length);
      return;
    }
    //new values
    item.push(itemObject);
    setCheckboxes(item);
    setCheckboxesLength(item.length);
    return;
  };

  let content = (
    <div>
      <motion.div
        key={props.itemType}
        initial={{ opacity: 0, x: 25 }}
        transition={{ x: { duration: 0.25 } }}
        animate={{
          x: 0,
          opacity: 1,
          transition: {
            duration: 0.25,
          },
        }}
        exit={{ opacity: 0, x: 0 }}
      >
        <h2>{props.itemType}</h2>
      </motion.div>
      <Form onSubmit={createTask} className={`mt-5`}>
        <Form.Group>
          <Form.Control
            className={`${style.control} `}
            {...title}
          ></Form.Control>
          <p className={`text-danger`}>{missingTitleMessage}</p>
        </Form.Group>
        <Form.Group>
          <Form.Control
            className={`${style.control} my-3`}
            {...description}
          ></Form.Control>
        </Form.Group>
        {props.itemType === "List" ? (
          Array.from(Array(checkboxesLength + 1).keys()).map((key) => {
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: -25 }}
                transition={{ y: { duration: 0.25 } }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.25,
                    delay: 0.25,
                  },
                }}
              >
                <Form.Group className={`mb-3`}>
                  <Form.Check
                    type="checkbox"
                    id={2}
                    className={`d-inline align-middle me-3`}
                  />
                  <Form.Control
                    onChange={(e) => updateCheckboxes(key, e.target.value)}
                    placeholder="to do..."
                    type="text"
                    className={`${style.control} w-25 py-0 align-middle d-inline`}
                  />
                </Form.Group>
              </motion.div>
            );
          })
        ) : (
          <span></span>
        )}
        <div className={`d-flex flex-row-reverse`}>
          <button
            onClick={() => setIsCloseModal(false)}
            className={`${buttons.primary} ms-3 px-3 py-2`}
          >
            Finish
          </button>
          <button
            onClick={() => setIsCloseModal(true)}
            className={`${buttons.secondary} bg-white px-3 py-2`}
          >
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );

  return content;
};

let CustomModal = (props) => {
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
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

let Detail = (props) => {
  let [isLoading, setIsLoading] = useState(true);
  let [item, setItem] = useState({});

  let getData = async () => {
    let items = JSON.parse(localStorage.getItem("tasks"));
    setItem(items[props.selectedData.index]);
  };

  useEffect(() => {
    if (props.selectedData.id !== null) {
      scroll(0, 0);
      getData();
      setIsLoading(false);
    }
  }, [props]);

  let content = (
    <div>
      <div
        className={`${style.frontground}`}
        onClick={() => {
          props.emitselecteddata({ id: null });
          document.getElementById("frontground").style.display = "none";
        }}
        id="frontground"
      ></div>
      <AnimatePresence>
        {props.selectedData.id && (
          <motion.div
            className={`w-50 p-5 rounded shadow-lg ${style.motion_div}`}
            layoutId={props.selectedData.id}
          >
            {!isLoading ? (
              <div>
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                {item.items !== null &&
                  item.items.map((item, index) => {
                    return (
                      <Form.Group key={item.text + "-" + index}>
                        <Form.Check
                          label={item.text}
                          id={item.text + "-" + index}
                        />
                      </Form.Group>
                    );
                  })}
              </div>
            ) : (
              <Spinner></Spinner>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
  return content;
};

//page
let Dashboard = () => {
  let [tasks, setTasks] = useState(null);
  let [isLoading, setIsLoading] = useState(true);
  let [modalShow, setModalShow] = useState(false);
  let [isContentGrid, setIsContentGrid] = useState(true);
  let [selectedData, setSelectedData] = useState({ id: null });

  let getTasks = () => {
    //if is loged
    //await

    setTasks(JSON.parse(localStorage.getItem("tasks")));
    setIsLoading(false);
    return;
  };

  useEffect(() => {
    getTasks();
  }, []);

  let content = (
    <div>
      {/*control_header*/}
      <motion.div
        key="control-dashboard"
        initial={{ opacity: 0, x: 25 }}
        transition={{ x: { duration: 0.5 } }}
        animate={{
          x: 0,
          opacity: 1,
          transition: {
            duration: 0.5,
            delay: 0.5,
          },
        }}
        exit={{ opacity: 0, x: 0 }}
      >
        <div
          className={`${style.control_header} w-100 position-fixed end-0 d-flex flex-row-reverse py-3`}
        >
          {
            <button
              onClick={() => setIsContentGrid(!isContentGrid)}
              className={`${buttons.primary}`}
            >
              <FontAwesomeIcon icon={isContentGrid ? faTableCells : faBars} />{" "}
              Order
            </button>
          }
          <button
            className={`${buttons.primary} mx-3`}
            onClick={() => setModalShow(true)}
          >
            <FontAwesomeIcon icon={faPlus} /> Add
          </button>
        </div>
      </motion.div>
      {/*content*/}
      <motion.div
        key="dashboard"
        initial={{ opacity: 0, y: -200 }}
        transition={{ y: { duration: 0.5 } }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.5,
            delay: 0.5,
          },
        }}
        exit={{ opacity: 0, y: 200 }}
      >
        <Container
          className={`${style.container} d-flex align-items-center justify-content-center position-relative`}
        >
          {tasks !== null ? (
            <div
              className={`${style.item_container}`}
              style={isContentGrid ? { columns: "3" } : null}
            >
              {!isLoading ? (
                tasks.map((task, index) => {
                  return (
                    <motion.div
                      className={`${style.item} rounded shadow`}
                      key={task + "-" + index}
                      layoutId={task + "-" + index}
                      onClick={() => {
                        setSelectedData({
                          id: task + "-" + index,
                          index: index,
                          isLoged: false,
                        });
                        document.getElementById("frontground").style.display =
                          "block";
                      }}
                    >
                      {/*<img
                        className={`rounded`}
                        src="https://assets.reedpopcdn.com/mario-kart-8-deluxe-dlc-release-time-9016-1647514624847.jpg/BROK/thumbnail/1600x900/format/jpg/quality/80/mario-kart-8-deluxe-dlc-release-time-9016-1647514624847.jpg"
                  />*/}
                      <h1>{task.title}</h1>
                      <p>{task.description.substr(0, 126)} ...</p>
                    </motion.div>
                  );
                })
              ) : (
                <Spinner></Spinner>
              )}
            </div>
          ) : (
            <div className={`${style.non_item_container}`}>
              <h2>
                It's look like you don't have Notes yet, press the{" "}
                <FontAwesomeIcon icon={faPlus} /> Add button to create Note
              </h2>
            </div>
          )}
        </Container>
      </motion.div>

      {/*components*/}
      <CustomModal
        show={modalShow}
        emititems={(items) => {
          if (items !== null) setTasks(items);
          setModalShow(false);
        }}
        onHide={() => setModalShow(false)}
      />
      <Detail
        selectedData={selectedData}
        emitselecteddata={(data) => setSelectedData(data)}
      />
    </div>
  );

  return content;
};

export default Dashboard;
