import style from "./Dashboard.module.css";
import buttons from "../../assets/global/buttons.module.css";

import CustomModal from "./CustomModal";
import Detail from "./Detail";
import { Tasks } from "../../services/Tasks";
import { motion } from "framer-motion";
import { Container, Spinner, ProgressBar } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableCells,
  faPlus,
  faBars,
  faTrash,
  faCircle,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

//page
let Index = () => {
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
              <a
                className={`${buttons.primary}`}
                style={{ padding: "0.25rem 0.75rem" }}
                href="/"
              >
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

export default Index;
//TODO create a progress bar component
