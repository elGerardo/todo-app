import style from "./Dashboard.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { Container, Modal, Form, Spinner, ProgressBar } from "react-bootstrap";
import { useEffect, useState } from "react";
import buttons from "../../assets/global/buttons.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableCells,
  faPlus,
  faNoteSticky,
  faList,
  faBars,
  faTrash,
  faXmark,
  faCircle,
  faCircleCheck,
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
  let [isLoading, setIsLoading] = useState(false);
  let [isSuccess, setIsSuccess] = useState(false);
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

    setIsLoading(true);
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
      await new Tasks().create(postData).then((response) => {
        if (response.status == 0) {
          setIsLoading(false);
          setIsSuccess(true);
          props.emitreload(true);
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
            className={`${
              !isLoading ? buttons.primary : buttons.primary_loading
            } ms-3 px-3 py-2`}
            disabled={isLoading || isSuccess}
          >
            {!isLoading ? (
              isSuccess ? (
                <span>Success!</span>
              ) : (
                <span>Finish</span>
              )
            ) : (
              <Spinner className={`text-center`} variant="white" />
            )}
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
            emitreload={(value) => {
              props.emitreload(value);
            }}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

let Detail = (props) => {
  let [isLoading, setIsLoading] = useState(true);
  let [isLoadingItem, setIsLoadingItem] = useState(false);
  let [item, setItem] = useState({});
  let [listItems, setListItems] = useState([]);

  let findTask = async () => {
    let loginData = localStorage.getItem("login");
    if (loginData != null) {
      await new Tasks().find(props.selectedData.id).then((response) => {
        if (response.status == 0) {
          setItem(response.data);
          if (response.data.type == "List")
            setListItems(response.data.task_items);
          setIsLoading(false);
          return;
        }
      });
      return;
    }

    let items = JSON.parse(localStorage.getItem("tasks"));
    setItem(items[props.selectedData.index]);
    setIsLoading(false);
    return;
  };

  let updateItem = async (id, value, index) => {
    setIsLoadingItem(true);
    await new Tasks().updateListItem(id, value).then((response) => {
      if (response.status === 0) {
        let data = listItems;
        data[index].status = value;
        setListItems(data);
        setIsLoadingItem(false);
      }
    });
  };

  useEffect(() => {
    if (props.selectedData.id !== null) {
      setIsLoading(true);
      scroll(0, 0);
      findTask();
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
            className={`p-5 rounded shadow-lg ${style.motion_div}`}
            layoutId={props.selectedData.id}
          >
            <span
              className={`position-absolute end-0 m-5 top-0`}
              style={{ cursor: "pointer", fontSize: "2.4rem" }}
              onClick={() => {
                props.emitselecteddata({ id: null });
                document.getElementById("frontground").style.display = "none";
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </span>

            {!isLoading ? (
              <div>
                <h1>{item.title}</h1>
                <p>{item.description}</p>

                {item.items !== null &&
                  listItems.map((i, index) => {
                    return (
                      <Form.Group
                        key={
                          i.task_item_id !== undefined
                            ? i.task_item_id
                            : i.text + "-" + index
                        }
                      >
                        <Form.Check
                          disabled={isLoadingItem}
                          label={i.text}
                          checked={i.status}
                          id={
                            i.task_item_id !== undefined
                              ? i.task_item_id
                              : i.text + "-" + index
                          }
                          onChange={(e) =>
                            updateItem(e.target.id, e.target.checked, index)
                          }
                        />
                      </Form.Group>
                    );
                  })}
                {item.type == "List" && (
                  <div className={`d-flex align-items-center my-4`}>
                    {(parseInt(
                      listItems.filter((item) => item.status == 1).length
                    ) /
                      parseInt(listItems.length)) *
                      100 !==
                    100 ? (
                      <FontAwesomeIcon
                        className={`text-light display-4`}
                        icon={faCircle}
                      />
                    ) : (
                      <motion.div
                        key="finished"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.5,
                          ease: [0, 0.71, 0.2, 1.01],
                        }}
                      >
                        <FontAwesomeIcon
                          className={`text-success display-4`}
                          icon={faCircleCheck}
                        />
                      </motion.div>
                    )}
                    <ProgressBar
                      className={`m-3 w-100`}
                      now={
                        (parseInt(
                          listItems.filter((item) => item.status == 1).length
                        ) /
                          parseInt(listItems.length)) *
                        100
                      }
                      label={`${(
                        (parseInt(
                          listItems.filter((item) => item.status == 1).length
                        ) /
                          parseInt(listItems.length)) *
                        100
                      ).toFixed(0)}%`}
                    />
                  </div>
                )}
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
  let [isContentGrid, setIsContentGrid] = useState(false);
  let [selectedData, setSelectedData] = useState({ id: null });

  let getTasks = async () => {
    //if is loged
    let loginData = localStorage.getItem("login");
    if (loginData != null) {
      await new Tasks().get().then((response) => {
        if (response.status == 0) {
          if (response.data.length !== 0) {
            setTasks(response.data);
          }
          setIsLoading(false);
          return;
        }
      });
      return;
    }
    //await

    setTasks(JSON.parse(localStorage.getItem("tasks")));
    setIsLoading(false);
    return;
  };

  let reloadTasks = async () => {
    let loginData = localStorage.getItem("login");
    if (loginData != null) {
      let data = JSON.parse(loginData);
      await new Tasks().get(data.user_id).then((response) => {
        if (response.status == 0) {
          if (response.data.length !== 0) {
            setTasks(response.data);
          } else {
            setTasks(null);
          }
          setModalShow(false);
          setIsLoading(false);
          return;
        }
      });
    }
  };

  let deleteTask = async ({ id, type }) => {
    await new Tasks().deleteItem({ id, type }).then(async (response) => {
      if (response.status == 0) {
        await reloadTasks();
      }
    });
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
        <div className={`${style.control_header} w-100 position-fixed p-3`}>
          <Container className={`d-flex justify-content-between`}>
            <div>
              <a className={`${buttons.primary}`} style={{padding:"0.25rem 0.75rem"}} href="/">
                Logout
              </a>
            </div>
            <div>
              <button
                className={`${buttons.primary} mx-3`}
                onClick={() => setModalShow(true)}
              >
                <FontAwesomeIcon icon={faPlus} />
                <span>Add</span>
              </button>
              <button
                onClick={() => setIsContentGrid(!isContentGrid)}
                className={`${buttons.primary}`}
              >
                <FontAwesomeIcon icon={isContentGrid ? faTableCells : faBars} />
                <span className={`px-1`}>Order</span>
              </button>
            </div>
          </Container>
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
              style={isContentGrid ? { columns: "2" } : null}
            >
              {!isLoading ? (
                tasks.map((task, index) => {
                  return (
                    <motion.div
                      className={`${style.item} rounded shadow position-relative`}
                      key={task.id !== undefined ? task.id : task + "-" + index}
                      layoutId={
                        task.id !== undefined ? task.id : task + "-" + index
                      }
                    >
                      {/*<img
                        className={`rounded`}
                        src="https://assets.reedpopcdn.com/mario-kart-8-deluxe-dlc-release-time-9016-1647514624847.jpg/BROK/thumbnail/1600x900/format/jpg/quality/80/mario-kart-8-deluxe-dlc-release-time-9016-1647514624847.jpg"
                  />*/}
                      <div
                        className={`w-100`}
                        onClick={() => {
                          setSelectedData({
                            id:
                              task.id !== undefined
                                ? task.id
                                : task + "-" + index,
                            index: index,
                            isLoged: false,
                          });
                          document.getElementById("frontground").style.display =
                            "block";
                        }}
                      >
                        <h1>{task.title}</h1>
                        <p>
                          {task.description.substr(0, 126)}{" "}
                          {task.description.length > 126 && "..."}
                        </p>
                        {task.type === "List" && (
                          <div className={`d-flex align-items-center`}>
                            {(parseInt(
                              task.task_items.filter((item) => item.status == 1)
                                .length
                            ) /
                              parseInt(task.task_items.length)) *
                              100 !==
                            100 ? (
                              <FontAwesomeIcon
                                className={`text-light display-4`}
                                icon={faCircle}
                              />
                            ) : (
                              <motion.div
                                key="finished"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  duration: 0.5,
                                  ease: [0, 0.71, 0.2, 1.01],
                                }}
                              >
                                <FontAwesomeIcon
                                  className={`text-success display-4`}
                                  icon={faCircleCheck}
                                />
                              </motion.div>
                            )}

                            <ProgressBar
                              className={`m-3 w-100`}
                              now={
                                (parseInt(
                                  task.task_items.filter(
                                    (item) => item.status == 1
                                  ).length
                                ) /
                                  parseInt(task.task_items.length)) *
                                100
                              }
                              label={`${(
                                (parseInt(
                                  task.task_items.filter(
                                    (item) => item.status == 1
                                  ).length
                                ) /
                                  parseInt(task.task_items.length)) *
                                100
                              ).toFixed(0)}%`}
                            />
                          </div>
                        )}
                      </div>
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() =>
                          deleteTask({ id: task.id, type: task.type })
                        }
                        className={`${buttons.primary_badge} position-absolute top-0 end-0 m-3`}
                      />
                    </motion.div>
                  );
                })
              ) : (
                <Spinner></Spinner>
              )}
            </div>
          ) : (
            <div className={`${style.non_item_container} text-center`}>
              <img src="./empty_state.png" />
              <h2 className={`my-5`}>Add a Note clicking the button + Add</h2>
            </div>
          )}
        </Container>
      </motion.div>

      {/*components*/}
      <CustomModal
        emitreload={(value) => {
          reloadTasks();
        }}
        show={modalShow}
        emititems={(items) => {
          if (items !== null) setTasks(items);
          setModalShow(false);
        }}
        onHide={() => setModalShow(false)}
      />
      <Detail
        selectedData={selectedData}
        emitselecteddata={(data) => {
          setSelectedData(data);
          getTasks();
        }}
      />
    </div>
  );

  return content;
};

export default Dashboard;
//TODO create a progress bar component
