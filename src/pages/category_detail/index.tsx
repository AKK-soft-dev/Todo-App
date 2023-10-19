import Breadcrumb from "../../components/reusable/Breadcrumb/Breadcrumb";
import SubCategories from "../../components/CategoryDetail/SubCatagories/SubCategories";
import TodoList from "../../components/CategoryDetail/TodoList/TodoList";
import { useState } from "react";
import { toast } from "react-toastify";
import { HiChevronLeft, HiTrash } from "react-icons/hi";
import { RiEdit2Fill } from "react-icons/ri";
import { AiFillClockCircle } from "react-icons/ai";
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
import ConfirmModal from "../../components/reusable/ConfirmModal/ConfirmModal";
import { formatDistanceToNow } from "date-fns";

const CategoryDetailPage = () => {
  const params = useParams();
  const categoryId = params["categoryId"];

  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();

  const [updateFormModalOpen, setUpdateFormModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

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

  const toggleConfirmMOdal = () => {
    setConfirmModalOpen((prev) => !prev);
  };

  const closeUpdateFormModal = () => {
    setUpdateFormModalOpen(false);
  };

  const closeConfirmModal = () => {
    setConfirmModalOpen(false);
  };

  const handleDelete = () => {
    if (IsCurrentRootCategory && currentRootCategory) {
      dispatch(deleteCategory(currentRootCategory));
      navigateTo(`/`);
    } else if (currentSubCategory) {
      dispatch(deleteSubCategory(currentSubCategory));
      navigateTo(`/categories/${currentSubCategory.parentId}`);
    }
    toast.success("Category deleted!", {
      autoClose: 3000,
      position: "top-right",
    });
  };

  return (
    <>
      <div className="mt-5 mb-3">
        <Breadcrumb overrideItems={tree} />
      </div>
      {currentRootCategory || currentSubCategory ? (
        <>
          <div className="flex flex-col w-full">
            <div className="flex gap-2 items-center flex-wrap ">
              <Link
                to={
                  IsCurrentRootCategory && currentRootCategory
                    ? `/`
                    : `/categories/${tree[tree.length - 2]?.id}`
                }
                className="text-xl font-bold flex items-center flex-wrap space-x-1 cursor-pointer"
              >
                <HiChevronLeft />{" "}
                <span className="block break-all">
                  {currentRootCategory?.name || currentSubCategory?.name}
                </span>
              </Link>
              <button onClick={toggleUpdateFormModal} className="text-xl">
                <RiEdit2Fill />
              </button>

              <button onClick={toggleConfirmMOdal} className="ml-auto text-2xl">
                <HiTrash />
              </button>
            </div>

            <span className="ml-5 flex items-center space-x-1 mb-2 text-black/60 text-xs">
              <AiFillClockCircle />
              <span>
                {formatDistanceToNow(
                  new Date(
                    (currentRootCategory || currentSubCategory)!.createdAt
                  ),
                  { addSuffix: true }
                )}
              </span>
            </span>

            <p className="ml-5 text-sm font-semibold text-black/60">
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
          <ConfirmModal
            title="Confirm deletion"
            body={
              <>
                Category called{" "}
                <span className="font-bold">
                  {(currentRootCategory || currentSubCategory)?.name}
                </span>{" "}
                and all of its content will be deleted. It can't be undone.
              </>
            }
            open={confirmModalOpen}
            onClose={closeConfirmModal}
            onConfirm={handleDelete}
          />
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
