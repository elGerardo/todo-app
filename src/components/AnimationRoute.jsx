import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Welcome from "../Pages/Welcome.jsx";
import NotFound from "../Pages/notfound/NotFound.jsx";
import Dashboard from "../Pages/dashboard/Dashboard.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

let AnimationRoute = () => {
  let location = useLocation();

  let content = (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route index element={<Welcome />} />
        <Route path='*' element={<NotFound />}/>
        <Route path="dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
        } />
      </Routes>
    </AnimatePresence>
  );

  return content;
};

export default AnimationRoute;
