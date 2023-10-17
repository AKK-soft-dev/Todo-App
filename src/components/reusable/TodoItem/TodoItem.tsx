import { HiChevronRight } from "react-icons/hi";
import { AiOutlineDelete, AiTwotoneCalendar } from "react-icons/ai";
import Checkbox from "../Checkbox/Checkbox";
import { formatDateToStr } from "../../../utils/formatDate";
import { TodoType } from "../../../redux/features/featureTypes";

const TodoItem = ({
  data: { title, description, dueDate, done },
}: {
  data: TodoType;
}) => {
  return (
    <article className="relative flex p-5 space-x-2 rounded hover:bg-slate-200 duration-200 cursor-pointer">
      <Checkbox id="checked" label="" checked={done} onChange={() => {}} />
      <div className="flex-1">
        <h2 className="font-semibold">{title}</h2>
        <p className="text-black/60 block text-sm font-medium truncate max-w-[150px] md:max-w-[250px]">
          {description}
        </p>
        <div className="text-xs mt-3 flex space-x-2 items-center text-black/50 font-medium">
          <AiTwotoneCalendar />
          <span>{formatDateToStr(dueDate)}</span>
        </div>
      </div>
      <span className="absolute top-1/2 -translate-y-1/2 right-5 flex space-x-1">
        <span
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <AiOutlineDelete />
        </span>
        <HiChevronRight />
      </span>
    </article>
  );
};

export default TodoItem;
