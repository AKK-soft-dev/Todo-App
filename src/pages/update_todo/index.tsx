import { mock_data } from "../../components/Home/mock-data";
import Breadcrumb from "../../components/reusable/Breadcrumb/Breadcrumb";
import TodoForm from "../../components/reusable/TodoForm/TodoForm";

const UpdateTodoPage = () => {
  return (
    <>
      <div className="mt-5 mb-3">
        <Breadcrumb overrideItems={["Personal", "Homework"]} />
      </div>
      <TodoForm
        type="update"
        todo={mock_data.todoList[1]}
        parentId="Personal"
      />
    </>
  );
};

export default UpdateTodoPage;
