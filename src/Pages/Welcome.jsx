import style from "./Welcome.module.css";
import buttons from "../assets/global/buttons.module.css";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

let Welcome = () => {
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
        className={`${style.container} d-flex align-items-center justify-content-center text-center`}
      >
        <div>
          <h1>ToDo App</h1>
          <p>A Simple App, where you can store your task.</p>
          <p>
            Create and account or Login to store your and never lose them.
          </p>
          <div className={`my-5`}>
            <Link to="login" className={`${buttons.secondary} d-inline mx-4`}>
              Login
            </Link>
            <Link to="signin" className={`${buttons.primary} d-inline mx-4`}>
              Create Account
            </Link>
            <div className={`w-100 d-flex justify-content-center`}>
              <Link to="dashboard" className={`${buttons.primary} d-block m-5 w-50`}>
                Get In as Guess
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </motion.div>
  );

  return content;
};

export default Welcome;
