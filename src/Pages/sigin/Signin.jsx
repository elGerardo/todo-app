import style from "./Signin.module.css";
import buttons from "../../assets/global/buttons.module.css";
import { Container, Form, Spinner } from "react-bootstrap";
import { useState } from "react";
import { motion } from "framer-motion";
import { Users } from "../../services/Users";

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

let Signin = () => {
  let firstName = useField({ type: "text", required: true });
  let lastName = useField({ type: "text", required: true });
  let userName = useField({ type: "text", required: true });
  let email = useField({ type: "email", required: true });
  let password = useField({ type: "password", required: true });
  let confirmPassword = useField({ type: "password", required: true });

  //0 filling fields, 1 is saving data, 2 success
  let [isLoading, setIsLoading] = useState(0);
  let [passwordMessage, setPasswordMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log(password);
    console.log(confirmPassword);
    if(password.value !== confirmPassword.value){
      setPasswordMessage("Passwords are not same");
      return;
    }
    setPasswordMessage("");
    setIsLoading(1);
    let postData = {
      username: userName,
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };

    await new Users().register(postData).then((response) => {
      if (response.status == 0) {
        console.log(response);
        localStorage.setItem("token", JSON.stringify(response.token));
        setIsLoading(2);
        return;
      }
    });
  };

  let content = (
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
      <Container
        className={` ${style.container} my-5 d-flex align-items-center justify-content-center`}
      >
        <div className={`w-50`}>
          <h1>Create Account</h1>
          <Form onSubmit={handleSubmit}>
            <div className={`d-flex w-100`}>
              <Form.Group className={`w-50 m-2`}>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  {...firstName}
                  disabled={isLoading !== 2 ? false : true}
                />
              </Form.Group>
              <Form.Group className={`w-50 m-2`}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  {...lastName}
                  disabled={isLoading !== 2 ? false : true}
                />
              </Form.Group>
            </div>
            <Form.Group className={`mx-1 my-3`}>
              <Form.Label>User Name</Form.Label>
              <Form.Control
                {...userName}
                disabled={isLoading !== 2 ? false : true}
              />
            </Form.Group>
            <Form.Group className={`mx-1 my-3`}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                {...email}
                disabled={isLoading !== 2 ? false : true}
              />
            </Form.Group>
            <Form.Group className={`mx-1 my-3`}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                {...password}
                disabled={isLoading !== 2 ? false : true}
              />
            </Form.Group>
            <Form.Group className={`mx-1 my-3`}>
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
              className={`${buttons.primary}`}
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

export default Signin;
