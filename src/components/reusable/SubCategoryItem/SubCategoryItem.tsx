import { HiChevronRight } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { SubCategoryType } from "../../../redux/features/featureTypes";
import { Link } from "react-router-dom";

const SubCategoryItem = ({ data }: { data: SubCategoryType }) => {
  return (
    <article className="relative flex items-center p-5 rounded hover:bg-slate-200 duration-200 cursor-pointer">
      <h2 className="font-semibold">{data.name}</h2>
      <span className="ml-auto flex space-x-2">
        <AiOutlineDelete />
        <HiChevronRight />
      </span>
      <Link
        to={`/categories/${data.id}`}
        className="absolute top-0 left-0 right-0 bottom-0"
      ></Link>
    </article>
  );
};

export default SubCategoryItem;
