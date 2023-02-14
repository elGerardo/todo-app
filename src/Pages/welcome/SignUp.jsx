import buttons from "../../assets/global/buttons.module.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { useField } from "../../customHooks/useField";
import { Container, Form, Spinner } from "react-bootstrap";
import { Users } from "../../services/Users";

export let SignUp = () => {
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
