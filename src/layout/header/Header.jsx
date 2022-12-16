import style from "./Header.module.css";
import { Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import buttons from "../../assets/global/buttons.module.css";
import { motion } from "framer-motion";

let Header = () => {

  let content = (
    <header
      id="header"
      className={`${style.header} ${
        useLocation().pathname !== "/dashboard"
          ? `position-fixed top-0 w-100`
          : `position-fixed top-0`
      }`}
      style={useLocation().pathname !== "/dashboard" ? {} : {marginLeft:"6.5%", width:"fit-content"}}
    >
      <Container className={`d-flex justify-content-between py-3`}>
        <Link to="/" className={`d-inline`}>
          Login
        </Link>
        <div>
          {useLocation().pathname !== "/dashboard" ? (
            <motion.div
              key="control"
              initial={{ opacity: 0, x: 25 }}
              transition={{ y: { duration: 0.5 } }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  duration: 0.5,
                  delay: 0.5,
                },
              }}
              exit={{ opacity: 0, x: 0 }}
            >
              <Link
                to="login"
                className={`${buttons.secondary} ${buttons.header_style} d-inline`}
              >
                Login
              </Link>
              <Link
                to="signin"
                className={`${buttons.primary} ${buttons.header_style} d-inline ms-5`}
              >
                Create Account
              </Link>
            </motion.div>
          ) : (
            <span></span>
          )}
        </div>
      </Container>
    </header>
  );

  return content;
};

export default Header;
