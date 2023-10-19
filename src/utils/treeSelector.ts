import { selectCategoryById } from "../redux/features/category/categorySlice";
import { selectSubCategoryById } from "../redux/features/subCategory/subCategorySlice";
import { RootState } from "../redux/store";

export type TreeItem = {
  id: string;
  name?: string;
  title?: string;
  parentId?: string;
};

export type TreeType = TreeItem[];

const treeSelector = (
  state: RootState,
  parentId: string,
  parentTree: TreeType
): TreeType => {
  const tree = [...parentTree];
  const parentCategory =
    selectSubCategoryById(state, parentId) ||
    selectCategoryById(state, parentId);

  if (parentCategory) {
    tree.unshift(parentCategory);
    if (!("parentId" in parentCategory)) {
      return tree;
    }
    if (parentCategory.parentId) {
      return treeSelector(state, parentCategory.parentId as string, tree);
    }
  }
  return tree;
};

export default treeSelector;
