import { CategoryType } from "../SubCategoryItem/types";

type CreateCategoryFormType = {
  type: "create";
  open: boolean;
  onClose: () => void;
  parentId?: string;
};

type UpdateCategoryFormType = {
  type: "update";
  open: boolean;
  onClose: () => void;
  category: CategoryType;
};

export type CategoryFormPropsType =
  | CreateCategoryFormType
  | UpdateCategoryFormType;
