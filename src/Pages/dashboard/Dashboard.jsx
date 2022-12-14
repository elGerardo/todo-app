import style from "./Dashboard.module.css";
import buttons from "../../assets/global/buttons.module.css";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";



let Dashboard = () => {
  let content = (
    <motion.div
      key="dashboard"
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
        className={`${style.container} d-flex align-items-center justify-content-center position-relative`}
      >
        <div className={`${style.item_container}`}>
          <div className={`${style.item} rounded shadow`}>
            <img
              className={`rounded`}
              src="https://assets.reedpopcdn.com/mario-kart-8-deluxe-dlc-release-time-9016-1647514624847.jpg/BROK/thumbnail/1600x900/format/jpg/quality/80/mario-kart-8-deluxe-dlc-release-time-9016-1647514624847.jpg"
            />
            <h1>Play Mario Kart</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              odio repudiandae laborum magni cupiditate, recusandae dolor dicta
              omnis facilis quas impedit maxime aut minus esse quos facere
              provident optio fuga?
            </p>
          </div>
          <div className={`${style.item} rounded shadow`}>
            <img
              className={`rounded`}
              src="https://assets.reedpopcdn.com/mario-kart-8-deluxe-dlc-release-time-9016-1647514624847.jpg/BROK/thumbnail/1600x900/format/jpg/quality/80/mario-kart-8-deluxe-dlc-release-time-9016-1647514624847.jpg"
            />
            <h1>Play Mario Kart</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              odio repudiandae laborum magni cupiditate, recusandae dolor dicta
              omnis facilis quas impedit maxime aut minus esse quos facere
              provident optio fuga?
            </p>
          </div>
          <div className={`${style.item} rounded shadow`}>
            <h1>Play Mario Kart</h1>
            <p>
              Lorem, ipsum dolor omnis facilis quas impedit maxime aut minus
              esse quos facere provident optio fuga?
            </p>
          </div>
          <div className={`${style.item} rounded shadow`}>
            <h1>Play Mario Kart</h1>
            <p>
              Lorem, facilis quas impedit maxime aut minus esse quos facere
              provident optio fuga?
            </p>
          </div>
          <div className={`${style.item} rounded shadow`}>
            <h1>Play Mario Kart</h1>
            <p>
              Lorem, facilis quas impedit maxime aut minus esse quos facere
              provident optio fuga?
            </p>
          </div>
          <div className={`${style.item} rounded shadow`}>
            <h1>Play Mario Kart</h1>
            <p>
              Lorem, facilis quas impedit maxime aut minus esse quos facere
              provident optio fuga?
            </p>
          </div>
          <div className={`${style.item} rounded shadow`}>
            <h1>Play Mario Kart</h1>
            <p>
              Lorem, facilis quas impedit maxime aut minus esse quos facere
              provident optio fuga?
            </p>
          </div>
          <div className={`${style.item} rounded shadow`}>
            <h1>Play Mario Kart</h1>
            <p>
              Lorem, facilis quas impedit maxime aut minus esse quos facere
              provident optio fuga?
            </p>
          </div>
          <div className={`${style.item} rounded shadow`}>
            <h1>Play Mario Kart</h1>
            <p>
              Lorem, facilis quas impedit maxime aut minus esse quos facere
              provident optio fuga?
            </p>
          </div>
          <div className={`${style.item} rounded shadow`}>
            <h1>Play Mario Kart</h1>
            <p>
              Lorem, facilis quas impedit maxime aut minus esse quos facere
              provident optio fuga?
            </p>
          </div>
          <div className={`${style.item} rounded shadow`}>
            <h1>Play Mario Kart</h1>
            <p>
              Lorem, facilis quas impedit maxime aut minus esse quos facere
              provident optio fuga?
            </p>
          </div>
        </div>
      </Container>
    </motion.div>
  );

  return content;
};

export default Dashboard;
