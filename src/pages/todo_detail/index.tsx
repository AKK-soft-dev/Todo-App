import Breadcrumb from "../../components/reusable/Breadcrumb/Breadcrumb";
import { RiEdit2Fill } from "react-icons/ri";
import { AiTwotoneCalendar } from "react-icons/ai";
import { formatDateToStr } from "../../utils/formatDate";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  deleteTodo,
  selectTodoById,
  updateTodo,
} from "../../redux/features/todo/todoSlice";
import useTree from "../../utils/custom-hooks/useTree";
import { formatDistanceToNow } from "date-fns";
import { HiChevronLeft, HiTrash } from "react-icons/hi";

const TodoDetail = () => {
  const params = useParams();
  const todoId = params["todoId"];
  const todo = useAppSelector((state) => selectTodoById(state, todoId!));
  const tree = useTree(todo?.parentId, todo!);
  const navigateTo = useNavigate();
  const handleNavigate = () => {
    if (todo) {
      navigateTo(`/update?todoId=${todo.id}`);
    }
  };

  const dispatch = useAppDispatch();
  const handleCheck = () => {
    if (todo) {
      dispatch(
        updateTodo({
          id: todo.id,
          changes: {
            done: !todo.done,
          },
        })
      );
    }
  };

  const handleDelete = () => {
    if (todo) {
      navigateTo(`/categories/${todo.parentId}`);
      dispatch(deleteTodo(todo));
      toast.success("Todo deleted!", {
        autoClose: 3000,
        position: "top-right",
      });
    }
  };

  return (
    <>
      <div className="mt-5 mb-3">
        <Breadcrumb overrideItems={tree} />
      </div>
      {todo ? (
        <>
          <div className="flex justify-end gap-3">
            <button
              onClick={handleDelete}
              className="flex space-x-1 items-center px-2 py-1 border border-black hover:text-white rounded font-medium hover:bg-black/80 active:bg-black duration-200"
            >
              <HiTrash /> <span>Delete</span>
            </button>
            <button
              onClick={handleNavigate}
              className="flex space-x-1 items-center px-2 py-1 bg-black text-white rounded font-medium hover:bg-black/80 active:bg-black duration-200"
            >
              <RiEdit2Fill /> <span>Edit</span>
            </button>
          </div>
          <section>
            <h1 className="text-xl font-bold">
              <Link
                to={`/categories/${todo.parentId}`}
                className="text-xl font-bold my-2 flex items-center space-x-1 cursor-pointer"
              >
                <HiChevronLeft /> <span>{todo.title}</span>
              </Link>
            </h1>
            <div className="mt-1 mb-5 flex items-center text-black/60 space-x-1 font-semibold">
              <span className="px-[2px] py-[1px] border border-black/30 rounded text-xs">
                {todo?.level}
              </span>
              <span>•</span>
              <span className="text-xs">
                {todo?.createdAt
                  ? formatDistanceToNow(new Date(todo.createdAt), {
                      addSuffix: true,
                    })
                  : "Unknown"}
              </span>
            </div>
            <p className="text-black/80 font-medium text-sm">
              {todo?.description}
            </p>
            <div className="flex mt-3">
              <button
                onClick={handleCheck}
                className={`flex space-x-1 items-center px-2 py-1 rounded text-xs font-medium border border-black ${
                  todo.done ? "text-white bg-black border-black" : "text-black"
                } duration-200`}
              >
                {todo.done ? "Completed" : "Mark as complete"}
              </button>
            </div>

            <div className="mt-5 flex justify-between text-black/70 font-medium">
              <span className="text-xs mt-3 flex space-x-1 items-center font-medium">
                <span>Due date : </span>
                <AiTwotoneCalendar />
                <span>
                  {todo?.dueDate ? formatDateToStr(todo.dueDate) : "Unknown"}
                </span>
              </span>
            </div>
          </section>
        </>
      ) : (
        <article className="my-5">
          <h1 className="text-xl font-bold">Todo not found!</h1>
          <p className="text-black/60 font-semibold">
            This can happen when your url is incorrect. Please don't mess with
            the url!
          </p>
        </article>
      )}
    </>
  );
};

export default TodoDetail;
