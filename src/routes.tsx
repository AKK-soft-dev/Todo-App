import { Routes, Route } from "react-router-dom";
import HomePage from "./pages";

const routes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
    </Routes>
  );
};

export default routes;
