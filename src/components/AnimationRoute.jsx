import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Welcome from "../Pages/Welcome.jsx";

let AnimationRoute = () => {
  let location = useLocation();

  let content = (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route index element={<Welcome />} />
      </Routes>
    </AnimatePresence>
  );

  return content;
};

export default AnimationRoute;
