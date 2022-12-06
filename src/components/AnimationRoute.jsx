import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Welcome from "../Pages/Welcome.jsx";
import Login from "../Pages/login/Login.jsx";
import Signin from "../Pages/sigin/SignIn.jsx";

let AnimationRoute = () => {
  let location = useLocation();

  let content = (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route index element={<Welcome />} />
        <Route path="login" element={<Login />}/>
        <Route path="signin" element={<Signin />}/>
      </Routes>
    </AnimatePresence>
  );

  return content;
};

export default AnimationRoute;
