import Breadcrumb from "../../components/reusable/Breadcrumb/Breadcrumb";
import SubCategories from "../../components/CategoryDetail/SubCatagories/SubCategories";
import TodoList from "../../components/CategoryDetail/TodoList/TodoList";
import { HiChevronLeft, HiTrash } from "react-icons/hi";
import { RiEdit2Fill } from "react-icons/ri";

const CategoryDetailPage = () => {
  return (
    <>
      <div className="mt-5 mb-2">
        <Breadcrumb />
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <h1 className="text-xl font-bold my-2 flex items-center space-x-1 cursor-pointer hover:underline">
              <HiChevronLeft /> <span>Personal</span>
            </h1>
            <button className="text-xl">
              <RiEdit2Fill />
            </button>
          </div>

          <p className="text-sm font-medium text-black/60">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. .
          </p>
        </div>

        <button className="text-2xl ">
          <HiTrash />
        </button>
      </div>

      <SubCategories />
      <TodoList />
    </>
  );
};

export default CategoryDetailPage;
