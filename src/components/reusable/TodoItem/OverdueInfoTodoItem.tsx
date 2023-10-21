import { HiChevronRight } from "react-icons/hi";
import { AiFillClockCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { TodoType } from "../../../redux/features/featureTypes";
import { formatDistanceToNow } from "date-fns";

const OverdueInfoTodoItem = ({
  data: { id, title, description, dueDate },
}: {
  data: TodoType;
}) => {
  return (
    <article className="relative flex space-x-2 rounded hover:bg-slate-200 duration-200 cursor-pointer">
      <div className="flex-1 relative p-5">
        <h2 className="font-semibold">
          <span className=" truncate w-[50%] block">{title}</span>
        </h2>
        <p className="text-black/60 block text-sm font-semibold truncate max-w-[150px] md:max-w-[250px]">
          {description}
        </p>
        <div className="text-xs mt-3 flex space-x-1 items-center text-red-400 font-medium">
          <AiFillClockCircle />
          <span>
            {formatDistanceToNow(new Date(dueDate), { addSuffix: true })}
          </span>
        </div>
        <Link
          to={`/todo/${id}`}
          className="absolute top-0 left-0 right-0 bottom-0"
        ></Link>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-5 flex space-x-1">
        <HiChevronRight />
      </div>
    </article>
  );
};

export default OverdueInfoTodoItem;
