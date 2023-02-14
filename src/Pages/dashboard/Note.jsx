import style from "./Dashboard.module.css";
import buttons from "../../assets/global/buttons.module.css";

import { Tasks } from "../../services/Tasks";
import { useField } from "../../customHooks/useField";
import { useState } from "react";
import { motion } from "framer-motion";
import { Form, Spinner } from "react-bootstrap";

export let Note = (props) => {
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
