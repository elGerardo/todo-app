import style from "./Dashboard.module.css";

import { useState } from "react";
import { Tasks } from "../../services/Tasks";
import { Form } from "react-bootstrap";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faCircle,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

export let Detail = (props) => {
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
