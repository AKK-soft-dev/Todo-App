import { mock_data } from "../../components/Home/mock-data";
import Breadcrumb from "../../components/reusable/Breadcrumb/Breadcrumb";
import { RiEdit2Fill } from "react-icons/ri";
import { AiTwotoneCalendar } from "react-icons/ai";
import { formatDateToStr } from "../../utils/formatDate";

const TodoDetail = () => {
  const { title, description, createdAt, dueDate, level } =
    mock_data.todoList[2];
  return (
    <>
      <div className="mt-5 mb-3">
        <Breadcrumb overrideItems={["Personal", "Homework"]} />
      </div>
      <div className="flex">
        <button className=" ml-auto flex space-x-1 items-center px-2 py-1 bg-black text-white rounded font-medium hover:bg-black/80 active:bg-black duration-200">
          <RiEdit2Fill /> <span>Edit</span>
        </button>
      </div>
      <section>
        <h1 className="text-xl font-bold">{title}</h1>
        <div className="mt-1 mb-5 flex items-center text-black/60 space-x-1 font-semibold">
          <span className="px-[2px] py-[1px] border border-black/30 rounded text-xs">
            {level}
          </span>
          <span>•</span>
          <span className="text-xs">{createdAt}</span>
        </div>
        <p className="text-black/80 font-medium text-sm">{description}</p>

        <div className="mt-5 flex justify-between text-black/70 font-medium">
          <span className="text-xs mt-3 flex space-x-1 items-center font-medium">
            <span>Due date : </span>
            <AiTwotoneCalendar />
            <span>{formatDateToStr(dueDate)}</span>
          </span>
        </div>
      </section>
    </>
  );
};

export default TodoDetail;
