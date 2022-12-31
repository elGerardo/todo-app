import style from "./NotFound.module.css";
import buttons from "../../assets/global/buttons.module.css";
import { Link } from "react-router-dom";

let LineStyle = (props) => {
  let content = (
    <span
      className={`${style.line} position-absolute`}
      style={{
        top: `${props.top}`,
        bottom: `${props.bottom}`,
        left: `${props.left}`,
        right: `${props.right}`,
        transform: `rotate(${props.rotate}deg)`,
        height: `${props.height}rem`,
        width: `${props.width}rem`,
        background: `${props.bg}`,
      }}
    ></span>
  );
  return content;
};

let NotFound = () => {
  let content = (
    <div
      className={`${style.container} d-flex align-items-center justify-content-center`}
    >
      <div
        className={`position-relative align-items-center bg-white justify-content-center h-75 w-75 rounded shadow-lg`}
      >
        <div className={`w-25 text-center`}>
          <h1>404</h1>
        </div>
        <div className={`w-75`}>
          <p>
            <b>There is nothing here!</b>
          </p>
          <p>
            It looks like you're lost, don't worry, you always can go back where
            you came ;)
          </p>
          <a to="/dashboard" className={`${buttons.primary}`}>
            Go Back
          </a>
        </div>
        <LineStyle
          top="0"
          bottom="none"
          left="0"
          right="none"
          rotate="135"
          height="4"
          width="25"
          bg="#eb3349"
        />
        <LineStyle
          top="0"
          left="2.5rem"
          rotate="135"
          height="2"
          width="10"
          bg="#f45c43"
        />
        <LineStyle
          left="-7rem"
          rotate="135"
          height="2"
          width="10"
          bg="#f45c43"
        />
        <LineStyle
          right="25rem"
          bottom="0"
          rotate="135"
          height="4"
          width="25"
          bg="#eb3349"
        />
        <LineStyle
          right="40rem"
          bottom="0"
          rotate="135"
          height="2"
          width="10"
          bg="#f45c43"
        />
        <LineStyle
          left="20rem"
          bottom="0"
          rotate="135"
          height="2"
          width="10"
          bg="#f14d45"
        />

        <LineStyle
          right="-10rem"
          top="0"
          rotate="135"
          height="4"
          width="25"
          bg="#eb3349"
        />

<LineStyle
          right="-5rem"
          top="5rem"
          rotate="135"
          height="2"
          width="10"
          bg="#f45c43"
        />
      </div>
    </div>
  );

  return content;
};

export default NotFound;
