import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todo/todoSlice";
import subCategoryReducer from "./features/subCategory/subCategorySlice";
import categoryReducer from "./features/category/categorySlice";

const store = configureStore({
  reducer: {
    todoList: todoReducer,
    subCategories: subCategoryReducer,
    categories: categoryReducer,
  },
});

store.subscribe(() => {
  localStorage.setItem("state", JSON.stringify(store.getState()));
  console.log({ state: store.getState() });
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
