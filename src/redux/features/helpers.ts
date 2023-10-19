import { subCategoryAdapter } from "./subCategory/subCategorySlice";
import { todoAdapter } from "./todo/todoSlice";
import { RootState } from "../store";

export const deleteTodoList = (state: RootState, todoIds: string[]) => {
  todoAdapter.removeMany(state.todoList, todoIds);
};

export const deleteSubCategoriesAndAllItsContent = (
  state: RootState,
  subCategoryIds: string[]
) => {
  for (const subCategoryId of subCategoryIds) {
    const subCategory = state.subCategories.entities[subCategoryId];
    if (subCategory) {
      if (subCategory.subCategories) {
        deleteSubCategoriesAndAllItsContent(state, subCategory.subCategories);
      }
      if (subCategory.todoList) {
        deleteTodoList(state, subCategory.todoList);
      }
      subCategoryAdapter.removeOne(state.subCategories, subCategory.id);
    }
  }
};
