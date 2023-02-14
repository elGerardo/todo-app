import buttons from "../../assets/global/buttons.module.css";
import { useState } from "react";
import { useField } from "../../customHooks/useField";
import { motion } from "framer-motion";
import { Container, Form, Spinner } from "react-bootstrap";
import { Users } from "../../services/Users";

export let Login = () => {
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
