import {
  EntityState,
  PayloadAction,
  combineReducers,
  configureStore,
  createReducer,
} from "@reduxjs/toolkit";
import todoReducer from "./features/todo/todoSlice";
import subCategoryReducer, {
  deleteSubCategory,
} from "./features/subCategory/subCategorySlice";
import categoryReducer, {
  deleteCategory,
} from "./features/category/categorySlice";
import {
  RootCategoryType,
  SubCategoryType,
  TodoType,
} from "./features/featureTypes";
import {
  deleteSubCategoriesAndAllItsContent,
  deleteTodoList,
} from "./features/helpers";

const store = configureStore({
  reducer: (state, action: PayloadAction<unknown>) => {
    const intermediateState = combineReducers({
      todoList: todoReducer,
      subCategories: subCategoryReducer,
      categories: categoryReducer,
    })(state, action);

    // this reducer will serve as a extraReducer for all slices.
    // the reason why I create this reducer is to be able to access global state.
    const customReducer = createReducer(state, (builder) => {
      // If the user deletes a root category, we also need to delete all of its sub categories and todo list
      builder.addCase(deleteCategory, (state, action) => {
        // parent (current category)
        const rootCategory = action.payload;
        const subCategoryIds = rootCategory.subCategories;
        const todoIds = rootCategory.todoList;

        if (todoIds) {
          deleteTodoList(state, todoIds);
        }

        if (subCategoryIds) {
          deleteSubCategoriesAndAllItsContent(state, subCategoryIds);
        }
      });

      // If the user deletes a sub category, we also need to delete all of its sub categories and todo list
      builder.addCase(deleteSubCategory, (state, action) => {
        // parent (currentCategory)
        const subCategory = action.payload;
        const subCategoryIds = subCategory.subCategories;
        const todoIds = subCategory.todoList;

        if (todoIds) {
          deleteTodoList(state, todoIds);
        }

        if (subCategoryIds) {
          deleteSubCategoriesAndAllItsContent(state, subCategoryIds);
        }
      });
    });

    return customReducer(intermediateState, action);
  },
});

store.subscribe(() => {
  localStorage.setItem("state", JSON.stringify(store.getState()));
});

export default store;

export type RootState = {
  todoList: EntityState<TodoType>;
  subCategories: EntityState<SubCategoryType>;
  categories: EntityState<RootCategoryType>;
};
export type AppDispatch = typeof store.dispatch;
