import buttons from "../../assets/global/buttons.module.css";

import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { useState } from "react";
import { motion } from "framer-motion";

export let ContainerLogin = () => {
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
