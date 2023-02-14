import style from "../Welcome.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Container, Carousel } from "react-bootstrap";

export let Examples = () => {
  let content = (
    <div
      className={`${style.container_examples} position-relative d-flex align-items-center justify-content-around flex-column bg-dark text-white text-center w-100 pt-3`}
    >
      <a
        href="#examples"
        className={`position-absolute text-center top-0 mt-2`}
      >
        <h1>See how this works</h1>
        <FontAwesomeIcon icon={faArrowDown} />
      </a>
      <Container className={`mt-5`}>
        <Carousel variant="dark" id="examples">
          <Carousel.Item>
            <img
              src="./examples/example_1.png"
              alt="First Example"
              className={`w-100`}
            />
            <Carousel.Caption className={`mt-5 bg-dark text-white rounded`}>
              <h1>ToDo list</h1>
              <p>Organizing your activities creating a ToDo list</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="./examples/example_2.png"
              alt="Second Example"
              className={`w-100`}
            />
            <Carousel.Caption className={`bg-dark text-white rounded`}>
              <h1>Progress</h1>
              <p>Keep the progress of your tasks</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="./examples/example_3.png"
              alt="Third Example"
              className={`w-100`}
            />
            <Carousel.Caption className={`bg-dark text-white rounded`}>
              <h1>Dinamyc dashboard</h1>
              <p>By grid or rows, your decide how to see your note cards</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  );

  return content;
};
