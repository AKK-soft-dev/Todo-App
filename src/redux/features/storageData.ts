import { EntityState } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { RootCategoryType, SubCategoryType, TodoType } from "./featureTypes";

const initialDataFromStorage: RootState | null = JSON.parse(
  localStorage.getItem("state") || "{}"
);

export const initialTodoListFromStorage: EntityState<TodoType> | undefined =
  initialDataFromStorage?.todoList;
export const initialSubCategoriesFromStorage:
  | EntityState<SubCategoryType>
  | undefined = initialDataFromStorage?.subCategories;
export const initialCategoriesFromStorage:
  | EntityState<RootCategoryType>
  | undefined = initialDataFromStorage?.categories;

export default initialDataFromStorage;
