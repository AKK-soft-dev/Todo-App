import { useMemo } from "react";
import treeSelector, { TreeItem } from "../treeSelector";
import store from "../../redux/store";

const useTree = (
  parentCategoryId: string | undefined,
  currentCategoryOrTodo: TreeItem
) => {
  const tree = useMemo(() => {
    const categoryTree = parentCategoryId
      ? treeSelector(store.getState(), parentCategoryId, [])
      : [];
    categoryTree.push(currentCategoryOrTodo!);
    return categoryTree;
  }, [parentCategoryId]);

  return tree;
};

export default useTree;
