import {
  RootCategoryType,
  SubCategoryType,
} from "../../../redux/features/featureTypes";

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
  parentId?: string;
  category: RootCategoryType | SubCategoryType;
};

export type CategoryFormPropsType =
  | CreateCategoryFormType
  | UpdateCategoryFormType;
