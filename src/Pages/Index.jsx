import style from "./Welcome.module.css";
import buttons from "../assets/global/buttons.module.css";
import { Examples } from "./welcome/Examples";
import { ContainerLogin } from "./welcome/ContainerLogin";
import { useEffect, useState } from "react";

let Index = () => {
  let [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    localStorage.removeItem("login");
  }, []);

  let content = (
    <div>
      <div
        className={`${style.container} w-100 d-flex align-items-center justify-content-around`}
      >
        <div className={`${style.bg_welcome}`}></div>
        {!hasStarted && (
          <div className={`${style.info_content} text-white text-center p-5`}>
            <h1>ToDo App</h1>
            <p>
              A place where you can keep a life style organized, creating notes
              and task list that always help you to never forgot something.
            </p>
            <button
              className={`${buttons.secondary} shadow-lg`}
              onClick={() => {
                setHasStarted(true);
              }}
            >
              Get Started
            </button>
          </div>
        )}
        {hasStarted && <ContainerLogin />}
      </div>
      <Examples />
    </div>
  );

  return content;
};

export default Index;
