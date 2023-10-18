import { HiChevronRight } from "react-icons/hi";
import { AiOutlineDelete, AiTwotoneCalendar } from "react-icons/ai";
import Checkbox from "../Checkbox/Checkbox";
import { formatDateToStr } from "../../../utils/formatDate";
import { TodoType } from "../../../redux/features/featureTypes";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTodo } from "../../../redux/features/todo/todoSlice";

const TodoItem = ({
  data: { id, title, description, dueDate, done },
}: {
  data: TodoType;
}) => {
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

  return (
    <article className="relative flex p-5 space-x-2 rounded hover:bg-slate-200 duration-200 cursor-pointer">
      <div className="z-10 relative">
        <Checkbox id="checked" label="" checked={done} onChange={handleCheck} />
      </div>
      <div className="flex-1 relative">
        <h2 className="font-semibold">{title}</h2>
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
      <span className="absolute top-1/2 -translate-y-1/2 right-5 flex space-x-1">
        <div
          className="relative z-10"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <AiOutlineDelete />
        </div>
        <HiChevronRight />
      </span>
    </article>
  );
};

export default TodoItem;
