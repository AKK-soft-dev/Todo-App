import Breadcrumb from "../../components/reusable/Breadcrumb/Breadcrumb";
import { RiEdit2Fill } from "react-icons/ri";
import { AiTwotoneCalendar } from "react-icons/ai";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  deleteTodo,
  selectTodoById,
  updateTodo,
} from "../../redux/features/todo/todoSlice";
import useTree from "../../utils/custom-hooks/useTree";
import { format, formatDistanceToNow, isAfter } from "date-fns";
import { HiChevronLeft, HiTrash } from "react-icons/hi";
import ConfirmModal from "../../components/reusable/ConfirmModal/ConfirmModal";

const TodoDetail = () => {
  const params = useParams();
  const todoId = params["todoId"];
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
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
      const nextValue = !todo.done;
      dispatch(
        updateTodo({
          id: todo.id,
          changes: {
            done: nextValue,
            doneAt: nextValue ? new Date().toISOString() : undefined,
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

  const toggleConfirmMOdal = () => {
    setConfirmModalOpen((prev) => !prev);
  };

  const closeConfirmModal = () => {
    setConfirmModalOpen(false);
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
              onClick={toggleConfirmMOdal}
              className="flex space-x-1 items-center px-2 py-1 border border-black hover:text-white rounded font-medium hover:bg-black/80 active:bg-black duration-200"
            >
              <HiTrash /> <span>Delete</span>
            </button>
            <button
              onClick={handleNavigate}
              className="flex space-x-1 items-center px-2 py-1 border border-black bg-black text-white rounded font-medium hover:bg-black/80 active:bg-black duration-200"
            >
              <RiEdit2Fill /> <span>Edit</span>
            </button>
          </div>
          <section>
            <h1 className="text-xl font-bold">
              <Link
                to={`/categories/${todo.parentId}`}
                className="text-xl font-bold mt-2 flex items-center space-x-1 cursor-pointer"
              >
                <HiChevronLeft /> <span>{todo.title}</span>
              </Link>
            </h1>
            <div className=" mb-5 flex items-center text-black/60 space-x-1 font-semibold">
              <span className="px-[2px] py-[1px] border border-black/30 rounded text-xs">
                {todo?.level}
              </span>
              <span>•</span>
              <span className="text-xs">
                {todo.createdAt
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

            <div
              className={`mt-5 flex justify-between ${
                isAfter(new Date(), new Date(todo.dueDate)) && !todo.done
                  ? "text-red-400"
                  : "text-black/70"
              } font-medium`}
            >
              <span className="text-xs mt-3 flex space-x-1 items-center font-medium">
                <span>Due date : </span>
                <AiTwotoneCalendar />
                <span>{format(new Date(todo.dueDate), "MMMM d, yyyy")}</span>
              </span>
            </div>
          </section>
          <ConfirmModal
            title="Confirm deletion"
            body={
              <>
                Todo called <span className="font-bold">{todo.title}</span> will
                be deleted. It can't be undone.
              </>
            }
            open={confirmModalOpen}
            onClose={closeConfirmModal}
            onConfirm={handleDelete}
          />
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
