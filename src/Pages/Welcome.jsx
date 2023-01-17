import style from "./Welcome.module.css";
import buttons from "../assets/global/buttons.module.css";
import { Carousel, Container, Form, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Users } from "../services/Users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

//custom states
let useField = ({ type, required }) => {
  let [value, setValue] = useState("");

  let onChange = (e) => {
    setValue(e.target.value);
  };

  return {
    required,
    type,
    value,
    onChange,
  };
};

//components
let Login = () => {
  let [isLoading, setIsLoading] = useState(false);
  let [isSuccess, setIsSuccess] = useState(false);
  let [apiMessage, setApiMessage] = useState("");
  let userName = useField({ type: "text", required: true });
  let password = useField({ type: "password", required: true });

  let handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let postData = {
      username: userName.value,
      password: password.value,
    };

    await new Users().login(postData).then((response) => {
      if (response.status == 0) {
        localStorage.setItem(
          "login",
          JSON.stringify({ token: response.token, user_id: response.user_id })
        );
        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 500);

        return;
      }
      setApiMessage(response.message);
      setIsLoading(false);
      return;
    });
  };

  let content = (
    <motion.div
      key="login"
      initial={{ opacity: 0, x: -25 }}
      transition={{ x: { duration: 0.25 } }}
      animate={{
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.25,
        },
      }}
      exit={{ opacity: 0, x: 25 }}
    >
      <Container className={`my-5 bg-white`} style={{ textAlign: "left" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className={`mt-5 mb-3`}>
            <Form.Label>User Name</Form.Label>
            <Form.Control {...userName} />
          </Form.Group>
          <Form.Group className={`mb-5 mt-3`}>
            <Form.Label>Password</Form.Label>
            <Form.Control {...password} />
          </Form.Group>
          <p className={`text-danger text-center`}>{apiMessage}</p>
          <button
            className={`${
              !isLoading ? buttons.primary : buttons.primary_loading
            } w-100`}
            disabled={isLoading || isSuccess}
          >
            {!isLoading ? (
              isSuccess ? (
                <span>Success!</span>
              ) : (
                <span>Login</span>
              )
            ) : (
              <Spinner className={`text-center`} variant="white" />
            )}
          </button>
        </Form>
      </Container>
    </motion.div>
  );

  return content;
};

let SignUp = () => {
  let userName = useField({ type: "text", required: true });
  let password = useField({ type: "password", required: true });
  let confirmPassword = useField({ type: "password", required: true });

  //0 filling fields, 1 is saving data, 2 success
  let [isLoading, setIsLoading] = useState(0);
  let [passwordMessage, setPasswordMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (password.value !== confirmPassword.value) {
      setPasswordMessage("Passwords are not same");
      return;
    }
    setPasswordMessage("");
    setIsLoading(1);
    let postData = {
      username: userName.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };

    await new Users().register(postData).then((response) => {
      if (response.status == 0) {
        localStorage.setItem(
          "login",
          JSON.stringify({ token: response.token, user_id: response.user_id })
        );
        setIsLoading(2);
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 500);
        return;
      }
    });
  };

  let content = (
    <motion.div
      key="signup"
      initial={{ opacity: 0, x: 25 }}
      transition={{ x: { duration: 0.25 } }}
      animate={{
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.25,
        },
      }}
      exit={{ opacity: 0, x: -25 }}
    >
      <Container
        className={`d-flex align-items-center justify-content-center bg-white my-5`}
      >
        <div>
          <Form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
            <Form.Group className={`my-3`}>
              <Form.Label>User Name</Form.Label>
              <Form.Control
                {...userName}
                disabled={isLoading !== 2 ? false : true}
              />
            </Form.Group>
            <Form.Group className={`my-3`}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                {...password}
                disabled={isLoading !== 2 ? false : true}
              />
            </Form.Group>
            <Form.Group className={`my-3`}>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                {...confirmPassword}
                disabled={isLoading !== 2 ? false : true}
              />
            </Form.Group>
            <p className={`text-danger`}>{passwordMessage}</p>
            <button
              type="submit"
              disabled={isLoading !== 2 ? false : true}
              className={`${buttons.primary} w-100`}
            >
              {isLoading === 0 ? (
                <span>Create Account</span>
              ) : isLoading === 1 ? (
                <Spinner animation="border" variant="light" />
              ) : (
                <span>Success</span>
              )}
            </button>
          </Form>
        </div>
      </Container>
    </motion.div>
  );

  return content;
};

let Examples = () => {
  let content = (
    <div
      className={`${style.container_examples} position-relative d-flex align-items-center justify-content-around flex-column bg-dark text-white text-center w-100 pt-3`}
    >
      <a
        href="#examples"
        className={`position-absolute text-center top-0 mt-2`}
      >
        <h1>See how this works</h1>
        <FontAwesomeIcon icon={faArrowDown} />
      </a>
      <Container className={`mt-5`}>
        <Carousel variant="dark" id="examples">
          <Carousel.Item>
            <img
              src="./examples/example_1.png"
              alt="First Example"
              className={`w-100`}
            />
            <Carousel.Caption className={`mt-5 bg-dark text-white rounded`}>
              <h1>ToDo list</h1>
              <p>Organizing your activities creating a ToDo list</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="./examples/example_2.png"
              alt="Second Example"
              className={`w-100`}
            />
            <Carousel.Caption className={`bg-dark text-white rounded`}>
              <h1>Progress</h1>
              <p>Keep the progress of your tasks</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="./examples/example_3.png"
              alt="Third Example"
              className={`w-100`}
            />
            <Carousel.Caption className={`bg-dark text-white rounded`}>
              <h1>Dinamyc dashboard</h1>
              <p>By grid or rows, your decide how to see your note cards</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  );

  return content;
};

let ContainerLogin = () => {
  let [isLogin, setIsLogin] = useState(true);

  let content = (
    <motion.div
      key="welcome"
      initial={{ opacity: 0, y: -25 }}
      transition={{ y: { duration: 0.25 } }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.25,
        },
      }}
      exit={{ opacity: 0, y: 25 }}
    >
      <h1 className={`text-white w-100 text-center`}>ToDo App</h1>
      <div
        className={`bg-white text-center shadow-lg rounded pt-5 pe-5 ps-5 pb-3`}
        style={{ height: "auto" }}
      >
        <div>
          <button
            onClick={() => setIsLogin(true)}
            className={`${
              isLogin ? buttons.primary_selected : buttons.primary
            } mx-3 ${isLogin ? "shadow" : ""}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`${
              !isLogin ? buttons.primary_selected : buttons.primary
            } mx-3 ${!isLogin ? "shadow" : ""}`}
          >
            Create Account
          </button>
        </div>
        {isLogin ? <Login /> : <SignUp />}
      </div>
    </motion.div>
  );
  return content;
};

//page
let Welcome = () => {
  let [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    localStorage.removeItem("login");
  }, []);

  let content = (
    <div>
      <div
        className={`${style.container} w-100 d-flex align-items-center justify-content-around`}
      >
        <div className={`${style.bg_welcome}`}></div>
        {!hasStarted && (
          <div className={`${style.info_content} text-white text-center p-5`}>
            <h1>ToDo App</h1>
            <p>
              A place where you can keep a life style organized, creating notes
              and task list that always help you to never forgot something.
            </p>
            <button
              className={`${buttons.secondary} shadow-lg`}
              onClick={() => {
                setHasStarted(true);
              }}
            >
              Get Started
            </button>
          </div>
        )}
        {hasStarted && <ContainerLogin />}
      </div>
      <Examples />
    </div>
  );

  return content;
};

export default Welcome;
