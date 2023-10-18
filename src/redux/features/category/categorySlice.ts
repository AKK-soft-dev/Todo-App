import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootCategoryType, SubCategoryType, TodoType } from "../featureTypes";
import { RootState } from "../../store";
import { addTodo, deleteTodo } from "../todo/todoSlice";
import {
  createSubCategory,
  deleteSubCategory,
} from "../subCategory/subCategorySlice";
import { initialCategoryData } from "./initalData";
import { nanoid } from "nanoid";

const categoryAdapter = createEntityAdapter<RootCategoryType>();

const initialState = initialCategoryData || categoryAdapter.getInitialState();

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    createCategory: {
      reducer: categoryAdapter.addOne,
      prepare: (category: Omit<RootCategoryType, "id">) => {
        return {
          payload: {
            id: nanoid(),
            ...category,
          },
        };
      },
    },
    updateCategory: categoryAdapter.updateOne,
    deleteCategory: (state, action: PayloadAction<RootCategoryType>) => {
      categoryAdapter.removeOne(state, action.payload.id);
    },
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

    builder.addCase(
      deleteSubCategory,
      (state, action: PayloadAction<{ id: string; parentId: string }>) => {
        const id = action.payload.id;
        const parentId = action.payload.parentId;
        const category = state.entities[parentId];

        if (category) {
          const subCategories = category?.subCategories || [];
          category.subCategories = subCategories.filter(
            (subId) => subId !== id
          );
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

    builder.addCase(deleteTodo, (state, action: PayloadAction<TodoType>) => {
      const parentIdOfTodo = action.payload.parentId;
      const category = state.entities[parentIdOfTodo];

      if (category) {
        const todoList = category.todoList || [];
        category.todoList = todoList.filter(
          (todoId) => todoId !== action.payload.id
        );
      }
    });
  },
});

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
} = categoryAdapter.getSelectors<RootState>((state) => state.categories);

export const { createCategory, updateCategory, deleteCategory } =
  categorySlice.actions;

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
