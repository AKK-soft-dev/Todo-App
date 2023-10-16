import { SubCategoryType } from "./types";
import { HiChevronRight } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";

const SubCategoryItem = ({ data }: { data: SubCategoryType }) => {
  return (
    <article className="flex items-center p-5 rounded hover:bg-slate-200 duration-200 cursor-pointer">
      <h2 className="font-semibold">{data.name}</h2>
      <span className="ml-auto flex space-x-2">
        <AiOutlineDelete />
        <HiChevronRight />
      </span>
    </article>
  );
};

export default SubCategoryItem;
