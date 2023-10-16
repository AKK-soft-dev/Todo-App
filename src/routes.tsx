import { Routes, Route } from "react-router-dom";
import HomePage from "./pages";
import CategoryDetailPage from "./pages/category_detail";
import CreateTodoPage from "./pages/create_todo";
import UpdateTodoPage from "./pages/update_todo";
import TodoDetail from "./pages/todo_detail";

const routes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/personal" element={<CategoryDetailPage />}></Route>
      <Route path="/create" element={<CreateTodoPage />}></Route>
      <Route path="/update" element={<UpdateTodoPage />}></Route>
      <Route path="/detail" element={<TodoDetail />}></Route>
    </Routes>
  );
};

export default routes;
