import Breadcrumb from "../../components/reusable/Breadcrumb/Breadcrumb";
import SubCategories from "../../components/CategoryDetail/SubCatagories/SubCategories";
import TodoList from "../../components/CategoryDetail/TodoList/TodoList";
import { useState } from "react";
import { HiChevronLeft, HiTrash } from "react-icons/hi";
import { RiEdit2Fill } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { selectCategoryById } from "../../redux/features/category/categorySlice";
import { selectSubCategoryById } from "../../redux/features/subCategory/subCategorySlice";
import useTree from "../../utils/custom-hooks/useTree";
import CategoryFormModal from "../../components/reusable/CategoryFormModal.tsx/CategoryFormModal";

const CategoryDetailPage = () => {
  const params = useParams();
  const categoryId = params["categoryId"];

  const [updateFormModalOpen, setUpdateFormModalOpen] = useState(false);

  const currentRootCategory = useAppSelector((state) =>
    selectCategoryById(state, categoryId!)
  );
  const currentSubCategory = useAppSelector((state) =>
    selectSubCategoryById(state, categoryId!)
  );
  const parentIdOfSubCategory = currentSubCategory?.parentId;

  const tree = useTree(
    parentIdOfSubCategory,
    currentRootCategory || currentSubCategory!
  );

  const IsCurrentRootCategory = !!currentRootCategory;

  const toggleUpdateFormModal = () => {
    setUpdateFormModalOpen((prev) => !prev);
  };

  const closeUpdateFormModal = () => {
    setUpdateFormModalOpen(false);
  };

  return (
    <>
      <div className="mt-5 mb-3">
        <Breadcrumb overrideItems={tree} />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex gap-2 items-center ">
          <Link
            to={
              IsCurrentRootCategory && currentRootCategory
                ? `/`
                : `/categories/${tree[tree.length - 2].id}`
            }
            className="text-xl font-bold my-2 flex items-center space-x-1 cursor-pointer"
          >
            <HiChevronLeft />{" "}
            <span>{currentRootCategory?.name || currentSubCategory?.name}</span>
          </Link>
          <button onClick={toggleUpdateFormModal} className="text-xl">
            <RiEdit2Fill />
          </button>

          <button className="ml-auto text-2xl">
            <HiTrash />
          </button>
        </div>

        <p className="text-sm font-medium text-black/60">
          {currentRootCategory?.description || currentSubCategory?.description}
        </p>
      </div>

      <SubCategories
        underRootParent={IsCurrentRootCategory}
        parentId={categoryId!}
      />
      <TodoList
        underRootParent={IsCurrentRootCategory}
        parentId={categoryId!}
      />
      {Boolean(currentRootCategory || currentSubCategory) && (
        <CategoryFormModal
          key={categoryId}
          parentId={parentIdOfSubCategory} // When this id is undefined, form will be updated
          open={updateFormModalOpen}
          onClose={closeUpdateFormModal}
          type="update"
          category={currentSubCategory || currentRootCategory!}
        />
      )}
    </>
  );
};

export default CategoryDetailPage;
