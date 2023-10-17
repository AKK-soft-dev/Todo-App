import Breadcrumb from "../../components/reusable/Breadcrumb/Breadcrumb";
import SubCategories from "../../components/CategoryDetail/SubCatagories/SubCategories";
import TodoList from "../../components/CategoryDetail/TodoList/TodoList";
import { HiChevronLeft, HiTrash } from "react-icons/hi";
import { RiEdit2Fill } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { selectCategoryById } from "../../redux/features/category/categorySlice";
import { selectSubCategoryById } from "../../redux/features/subCategory/subCategorySlice";
import useTree from "../../utils/custom-hooks/useTree";

const CategoryDetailPage = () => {
  const params = useParams();
  const categoryId = params["categoryId"];
  const currentRootCategory = useAppSelector((state) =>
    selectCategoryById(state, categoryId!)
  );
  const subCategory = useAppSelector((state) =>
    selectSubCategoryById(state, categoryId!)
  );
  const parentIdOfSubCategory = subCategory?.parentId;

  const tree = useTree(
    parentIdOfSubCategory,
    currentRootCategory || subCategory!
  );

  const IsCurrentRootCategory = !!currentRootCategory;

  return (
    <>
      <div className="mt-5 mb-2">
        <Breadcrumb overrideItems={tree} />
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <Link
              to={
                IsCurrentRootCategory && currentRootCategory
                  ? `/`
                  : `/categories/${tree[tree.length - 2].id}`
              }
              className="text-xl font-bold my-2 flex items-center space-x-1 cursor-pointer hover:underline"
            >
              <HiChevronLeft />{" "}
              <span>{currentRootCategory?.name || subCategory?.name}</span>
            </Link>
            <button className="text-xl">
              <RiEdit2Fill />
            </button>
          </div>

          <p className="text-sm font-medium text-black/60">
            {currentRootCategory?.description || subCategory?.description}
          </p>
        </div>

        <button className="text-2xl">
          <HiTrash />
        </button>
      </div>

      <SubCategories
        underRootParent={IsCurrentRootCategory}
        parentId={categoryId!}
      />
      <TodoList
        underRootParent={IsCurrentRootCategory}
        parentId={categoryId!}
      />
    </>
  );
};

export default CategoryDetailPage;
