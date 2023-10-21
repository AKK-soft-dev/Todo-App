import { useSearchParams } from "react-router-dom";
import Breadcrumb from "../../components/reusable/Breadcrumb/Breadcrumb";
import TodoForm from "../../components/reusable/TodoForm/TodoForm";
import { useAppSelector } from "../../redux/hooks";
import { selectTodoById } from "../../redux/features/todo/todoSlice";
import useTree from "../../utils/custom-hooks/useTree";

const UpdateTodoPage = () => {
  const searchParams = useSearchParams();
  const todoId = searchParams[0].get("todoId");
  const todo = useAppSelector((state) => selectTodoById(state, todoId!));
  const tree = useTree(todo?.parentId, todo!);
  return (
    <>
      <div className="mt-5 mb-3">
        <Breadcrumb overrideItems={tree} />
      </div>
      <TodoForm type="update" todo={todo!} parentId={todo?.parentId!} />
    </>
  );
};

export default UpdateTodoPage;
