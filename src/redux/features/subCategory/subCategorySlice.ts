import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { SubCategoryType, TodoType } from "../featureTypes";
import { RootState } from "../../store";
import { addTodo } from "../todo/todoSlice";
import { initialSubCategoryData } from "./initialData";

const subCategoryAdapter = createEntityAdapter<SubCategoryType>();

const initialState =
  initialSubCategoryData || subCategoryAdapter.getInitialState();

const subCategorySlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    createSubCategory: (state, action: PayloadAction<SubCategoryType>) => {
      const parentId = action.payload.parentId;
      const subCategory = state.entities[parentId];
      const subCategories = subCategory?.subCategories || [];
      if (subCategory && !subCategories.includes(action.payload.id)) {
        subCategory.subCategories = subCategories.concat(action.payload.id);
      }

      subCategoryAdapter.addOne(state, action);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTodo, (state, action: PayloadAction<TodoType>) => {
      const parentId = action.payload.parentId;
      const subCategory = state.entities[parentId];
      const todoList = subCategory?.todoList || [];
      if (subCategory && !todoList.includes(action.payload.id)) {
        subCategory.todoList = todoList.concat(action.payload.id);
      }
    });
  },
});

export const {
  selectAll: selectAllSubCategories,
  selectById: selectSubCategoryById,
} = subCategoryAdapter.getSelectors<RootState>((state) => state.subCategories);

export const { createSubCategory } = subCategorySlice.actions;

const subCategoryReducer = subCategorySlice.reducer;
export default subCategoryReducer;
