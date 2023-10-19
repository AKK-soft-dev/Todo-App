import { useMemo } from "react";
import treeSelector, { TreeItem } from "../treeSelector";
import store from "../../redux/store";

const useTree = (
  parentCategoryId: string | undefined,
  currentCategoryOrTodo: TreeItem
) => {
  const tree = useMemo(() => {
    // if we are trying to get the parents of rootCategory, we don't need to retrieve as we already got current item.
    const categoryTree = parentCategoryId
      ? treeSelector(store.getState(), parentCategoryId, [])
      : [];
    categoryTree.push(currentCategoryOrTodo!);
    return categoryTree;
  }, [parentCategoryId, currentCategoryOrTodo]);

  return tree;
};

export default useTree;
