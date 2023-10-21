import { HiChevronRight } from "react-icons/hi";
import { AiTwotoneCalendar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { TodoType } from "../../../redux/features/featureTypes";
import { addDays, format, subHours } from "date-fns";

const CompletedInfoTodoItem = ({
  data: { id, title, description, doneAt },
}: {
  data: TodoType;
}) => {
  const date = addDays(new Date("03/15/2023"), 10);
  const customDate = subHours(date, 4);
  console.log(customDate.toISOString());
  return (
    <article className="relative flex space-x-2 rounded hover:bg-slate-200 duration-200 cursor-pointer">
      <div className="flex-1 relative p-5">
        <h2 className="font-semibold">
          <span className=" truncate w-[50%] block">{title}</span>
        </h2>
        <p className="text-black/60 block text-sm font-semibold truncate max-w-[150px] md:max-w-[250px]">
          {description}
        </p>
        <div className="text-xs mt-3 flex space-x-2 items-center text-green-400 font-medium">
          <AiTwotoneCalendar />
          <span>{format(new Date(doneAt!), "MMM d, yyyy h:mm a")}</span>
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

export default CompletedInfoTodoItem;
