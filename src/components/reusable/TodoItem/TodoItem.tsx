import { HiChevronRight } from "react-icons/hi";
import { useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineDelete, AiTwotoneCalendar } from "react-icons/ai";
import Checkbox from "../Checkbox/Checkbox";
import { formatDateToStr } from "../../../utils/formatDate";
import { TodoType } from "../../../redux/features/featureTypes";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../../../redux/features/todo/todoSlice";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

const TodoItem = ({ data }: { data: TodoType }) => {
  const { id, title, description, dueDate, done } = data;
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const dispatch = useDispatch();
  const handleCheck = () => {
    dispatch(
      updateTodo({
        id,
        changes: {
          done: !done,
        },
      })
    );
  };

  const handleDelete = () => {
    dispatch(deleteTodo(data));
    toast.success("Todo deleted!", {
      autoClose: 3000,
      position: "top-right",
    });
  };

  const toggleConfirmMOdal = (e: React.MouseEvent) => {
    e.preventDefault();
    setConfirmModalOpen((prev) => !prev);
  };

  const closeConfirmModal = () => {
    setConfirmModalOpen(false);
  };

  return (
    <article className="relative flex p-5 space-x-2 rounded hover:bg-slate-200 duration-200 cursor-pointer">
      <div className="z-10 relative">
        <Checkbox id="checked" label="" checked={done} onChange={handleCheck} />
      </div>
      <div className="flex-1 relative">
        <h2 className="font-semibold">
          <span className=" truncate w-[50%] block">{title}</span>
        </h2>
        <p className="text-black/60 block text-sm font-semibold truncate max-w-[150px] md:max-w-[250px]">
          {description}
        </p>
        <div className="text-xs mt-3 flex space-x-2 items-center text-black/60 font-medium">
          <AiTwotoneCalendar />
          <span>{formatDateToStr(dueDate)}</span>
        </div>
        <Link
          to={`/todo/${id}`}
          className="absolute top-0 left-0 right-0 bottom-0"
        ></Link>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-5 flex space-x-1">
        <div className="relative z-10" onClick={toggleConfirmMOdal}>
          <AiOutlineDelete />
        </div>
        <HiChevronRight />
      </div>
      <ConfirmModal
        title="Confirm deletion"
        body={
          <>
            Todo called <span className="font-bold">{data.title}</span> will be
            deleted. It can't be undone.
          </>
        }
        open={confirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleDelete}
      />
    </article>
  );
};

export default TodoItem;
