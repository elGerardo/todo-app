import style from "./Welcome.module.css";
import buttons from "../assets/global/buttons.module.css";
import { Container, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Users } from "../services/Users";

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
  let navigate = useNavigate();
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
        setTimeout(() => {
          localStorage.setItem(
            "login",
            JSON.stringify({ token: response.token, user_id: response.user_id })
          );
          setIsLoading(false);
          setIsSuccess(true);
          navigate("/dashboard");
        });
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
  let email = useField({ type: "email", required: true });
  let password = useField({ type: "password", required: true });
  let confirmPassword = useField({ type: "password", required: true });
  let navigate = useNavigate();

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
      email: email.value,
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
        navigate("/dashboard");
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
      <div
        className={`d-flex align-items-center justify-content-center w-100 bh-white my-5`}
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
              <Form.Label>Email</Form.Label>
              <Form.Control
                {...email}
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
      </div>
    </motion.div>
  );

  return content;
};

//page
let Welcome = () => {
  let [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    localStorage.removeItem("login");
  }, [])

  let content = (
    <div
      className={`${style.container} d-flex align-items-center justify-content-center text-center my-5`}
    >
      <div className={`${style.bg_welcome}`}></div>
      <motion.div
        key="welcome"
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
        <h1 className={`text-white`}>ToDo App</h1>
        <div
          className={`${style.content} bg-white shadow-lg rounded pt-5 pe-5 ps-5 pb-3`}
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
    </div>
  );

  return content;
};

export default Welcome;
