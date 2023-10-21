import { useSearchParams } from "react-router-dom";
import Breadcrumb from "../../components/reusable/Breadcrumb/Breadcrumb";
import TodoForm from "../../components/reusable/TodoForm/TodoForm";
import { useAppSelector } from "../../redux/hooks";
import { selectCategoryById } from "../../redux/features/category/categorySlice";
import { selectSubCategoryById } from "../../redux/features/subCategory/subCategorySlice";
import useTree from "../../utils/custom-hooks/useTree";

const CreateTodoPage = () => {
  const searchParams = useSearchParams();
  const parentId = searchParams[0].get("parent");
  const category = useAppSelector(
    (state) =>
      selectCategoryById(state, parentId!) ||
      selectSubCategoryById(state, parentId!)
  );
  const existParentId = "parentId" in category!;

  const tree = useTree(
    existParentId ? (category.parentId as string) : undefined,
    category!
  );

  return (
    <>
      <div className="mt-5 mb-3">
        <Breadcrumb overrideItems={tree} />
      </div>
      <TodoForm type="create" parentId={category?.id!} />
    </>
  );
};

export default CreateTodoPage;
