import Breadcrumb from "../../components/reusable/Breadcrumb/Breadcrumb";
import SubCategories from "../../components/CategoryDetail/SubCatagories/SubCategories";
import TodoList from "../../components/CategoryDetail/TodoList/TodoList";
import { useState } from "react";
import { HiChevronLeft, HiTrash } from "react-icons/hi";
import { RiEdit2Fill } from "react-icons/ri";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  deleteCategory,
  selectCategoryById,
} from "../../redux/features/category/categorySlice";
import {
  deleteSubCategory,
  selectSubCategoryById,
} from "../../redux/features/subCategory/subCategorySlice";
import useTree from "../../utils/custom-hooks/useTree";
import CategoryFormModal from "../../components/reusable/CategoryFormModal.tsx/CategoryFormModal";

const CategoryDetailPage = () => {
  const params = useParams();
  const categoryId = params["categoryId"];

  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();

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

  const handleDelete = () => {
    if (IsCurrentRootCategory && currentRootCategory) {
      dispatch(deleteCategory(currentRootCategory));
      navigateTo(`/`);
    } else if (currentSubCategory) {
      dispatch(deleteSubCategory(currentSubCategory));
      navigateTo(`/categories/${currentSubCategory.parentId}`);
    }
  };

  return (
    <>
      <div className="mt-5 mb-3">
        <Breadcrumb overrideItems={tree} />
      </div>
      {currentRootCategory || currentSubCategory ? (
        <>
          <div className="flex flex-col w-full">
            <div className="flex gap-2 items-center ">
              <Link
                to={
                  IsCurrentRootCategory && currentRootCategory
                    ? `/`
                    : `/categories/${tree[tree.length - 2]?.id}`
                }
                className="text-xl font-bold my-2 flex items-center space-x-1 cursor-pointer"
              >
                <HiChevronLeft />{" "}
                <span>
                  {currentRootCategory?.name || currentSubCategory?.name}
                </span>
              </Link>
              <button onClick={toggleUpdateFormModal} className="text-xl">
                <RiEdit2Fill />
              </button>

              <button onClick={handleDelete} className="ml-auto text-2xl">
                <HiTrash />
              </button>
            </div>

            <p className="text-sm font-medium text-black/60">
              {currentRootCategory?.description ||
                currentSubCategory?.description}
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
      ) : (
        <article className="my-5">
          <h1 className="text-xl font-bold">Category not found!</h1>
          <p className="text-black/60 font-semibold">
            This can happen when your url is incorrect. Please don't mess with
            the url!
          </p>
        </article>
      )}
    </>
  );
};

export default CategoryDetailPage;
