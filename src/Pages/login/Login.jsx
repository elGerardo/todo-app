import { Container } from "react-bootstrap";
import style from "./Login.module.css";
import { motion } from "framer-motion";

let Login = () => {

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
        <Container className={`${style.container} d-flex align-items-center justify-content-center`}>
            <h1>Login</h1>
        </Container>
    </motion.div>
    );

    return content;

}

export default Login;