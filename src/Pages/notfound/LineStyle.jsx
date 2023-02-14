import style from "./NotFound.module.css";

export let LineStyle = (props) => {
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
