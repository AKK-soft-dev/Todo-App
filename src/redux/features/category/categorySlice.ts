import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  CategoryType,
  RootCategoryType,
  SubCategoryType,
  TodoType,
} from "../featureTypes";
import { RootState } from "../../store";
import { addTodo } from "../todo/todoSlice";
import { createSubCategory } from "../subCategory/subCategorySlice";
import { initialCategoryData } from "./initalData";

const categoryAdapter = createEntityAdapter<RootCategoryType>();

const initialState = initialCategoryData || categoryAdapter.getInitialState();

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    createCategory: categoryAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(
      createSubCategory,
      (state, action: PayloadAction<SubCategoryType>) => {
        const parentId = action.payload.parentId;
        const category = state.entities[parentId];
        const subCategories = category?.subCategories || [];
        if (category && !subCategories.includes(action.payload.id)) {
          category.subCategories = subCategories.concat(action.payload.id);
        }
      }
    );

    builder.addCase(addTodo, (state, action: PayloadAction<TodoType>) => {
      const parentId = action.payload.parentId;
      const category = state.entities[parentId];
      const todoList = category?.todoList || [];
      if (category && !todoList.includes(action.payload.id)) {
        category.todoList = todoList.concat(action.payload.id);
      }
    });
  },
});

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
} = categoryAdapter.getSelectors<RootState>((state) => state.categories);

export const { createCategory } = categorySlice.actions;

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
