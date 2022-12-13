import style from "./Login.module.css";
import buttons from "../../assets/global/buttons.module.css";
import { Container, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import { useState } from "react";

let useField = ({type, required}) => {
  let [value, setValue] = useState("");

  let onChange = (e) => {
    setValue(e.target.value);
  }

  return {
    required,
    type,
    value,
    onChange
  }
}

let Login = () => {

  let userName = useField({type:"text", required: true});
  let password = useField({type:"password", required: true});

  let handleSubmit = (e) => {
    e.preventDefault();
    let postData = {
      username: userName,
      password: password
    };
    console.log(postData);
  }

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
        className={`${style.container} d-flex align-items-center justify-content-center`}
      >
        <Form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <Form.Group className={`my-3`}>
            <Form.Label>User Name</Form.Label>
            <Form.Control {...userName}/>
          </Form.Group>
          <Form.Group className={`my-3`}>
            <Form.Label>Password</Form.Label>
            <Form.Control {...password}/>
          </Form.Group>
          <button className={`${buttons.primary}`}>
            Login 
          </button>
        </Form>

      </Container>
    </motion.div>
  );

  return content;
};

export default Login;
