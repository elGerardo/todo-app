import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Welcome from "../Pages/Welcome.jsx";
import Dashboard from "../Pages/dashboard/Dashboard.jsx";

let AnimationRoute = () => {
  let location = useLocation();

  let content = (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route index element={<Welcome />} />
        <Route path="dashboard" element={<Dashboard />}/>
      </Routes>
    </AnimatePresence>
  );

  return content;
};

export default AnimationRoute;
