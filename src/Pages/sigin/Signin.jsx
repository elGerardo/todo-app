import style from "./Signin.module.css";
import buttons from "../../assets/global/buttons.module.css";
import { Container, Form } from "react-bootstrap";
import { useState } from "react";
import { motion } from "framer-motion";

let useField = ({ type }) => {
  let [value, setValue] = useState("");
  let onChange = (e) => {
    setValue(e.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

let Signin = () => {
  let firstName = useField({ type: "text" });
  let lastName = useField({ type: "text" });
  let email = useField({ type: "email" });
  let password = useField({ type: "password" });
  let confirmPassword = useField({ type: "password" });

  let handleSubmit = (e) => {
    e.preventDefault();
    let postData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };
    console.log(postData);
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
        className={` ${style.container} d-flex align-items-center justify-content-center`}
      >
        <div className={`w-50`}>
          <h1>Create Account</h1>
          <Form onSubmit={handleSubmit}>
            <div className={`d-flex w-100`}>
              <Form.Group className={`w-50 m-2`}>
                <Form.Label>First Name</Form.Label>
                <Form.Control {...firstName} />
              </Form.Group>
              <Form.Group className={`w-50 m-2`}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control {...lastName} />
              </Form.Group>
            </div>
            <Form.Group className={`mx-1 my-3`}>
              <Form.Label>Email</Form.Label>
              <Form.Control {...email} />
            </Form.Group>
            <Form.Group className={`mx-1 my-3`}>
              <Form.Label>Password</Form.Label>
              <Form.Control {...password} />
            </Form.Group>
            <Form.Group className={`mx-1 my-3`}>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control {...confirmPassword} />
            </Form.Group>
            <button type="submit" className={`${buttons.primary}`}>
              Create Account
            </button>
          </Form>
        </div>
      </Container>
    </motion.div>
  );

  return content;
};

export default Signin;
