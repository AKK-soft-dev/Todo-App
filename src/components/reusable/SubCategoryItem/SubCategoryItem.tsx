import { HiChevronRight } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { SubCategoryType } from "../../../redux/features/featureTypes";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { deleteSubCategory } from "../../../redux/features/subCategory/subCategorySlice";

const SubCategoryItem = ({ data }: { data: SubCategoryType }) => {
  const dispatch = useAppDispatch();
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteSubCategory(data));
  };
  return (
    <article className="relative flex h-16 rounded hover:bg-slate-200 duration-200 cursor-pointer">
      <h2 className="absolute top-0 left-0 right-0 bottom-0 font-semibold flex items-center p-5">
        {data.name}
        <Link
          to={`/categories/${data.id}`}
          className="absolute top-0 left-0 right-0 bottom-0"
        ></Link>
      </h2>
      <div className="absolute top-1/2 -translate-y-1/2 right-5 flex space-x-1">
        <div className="relative z-10" onClick={handleDelete}>
          <AiOutlineDelete />
        </div>
        <HiChevronRight />
      </div>
    </article>
  );
};

export default SubCategoryItem;
