import {
  EntityState,
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { SubCategoryType, TodoType } from "../featureTypes";
import { RootState } from "../../store";
import { addTodo, deleteTodo } from "../todo/todoSlice";
import { initialSubCategoryData } from "./initialData";
import { nanoid } from "nanoid";
import { initialSubCategoriesFromStorage } from "../storageData";

export const subCategoryAdapter = createEntityAdapter<SubCategoryType>();

const initialState =
  initialSubCategoriesFromStorage ||
  initialSubCategoryData ||
  subCategoryAdapter.getInitialState();

const subCategorySlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    createSubCategory: {
      reducer: (state, action: PayloadAction<SubCategoryType>) => {
        const parentId = action.payload.parentId;
        // parent of sub category
        const subCategory = state.entities[parentId];
        const subCategories = subCategory?.subCategories || [];
        if (subCategory && !subCategories.includes(action.payload.id)) {
          subCategory.subCategories = subCategories.concat(action.payload.id);
        }

        subCategoryAdapter.addOne(state, action);
      },
      prepare: (subCategory: Omit<SubCategoryType, "id">) => {
        return {
          payload: {
            id: nanoid(),
            ...subCategory,
          },
        };
      },
    },
    updateSubCategory: subCategoryAdapter.updateOne,
    deleteSubCategory: (
      state: EntityState<SubCategoryType>,
      action: PayloadAction<SubCategoryType>
    ) => {
      const id = action.payload.id;
      const parentId = action.payload.parentId;
      // parent of sub category
      const subCategory = state.entities[parentId];

      if (subCategory) {
        const subCategories = subCategory.subCategories || [];
        subCategory.subCategories = subCategories.filter(
          (subId) => subId !== id
        );
      }

      // We also need to remove all children
      const subCategoryIds = action.payload.subCategories;
      if (subCategoryIds) {
        subCategoryAdapter.removeMany(state, subCategoryIds);
      }

      subCategoryAdapter.removeOne(state, id);
    },
  },
  extraReducers: (builder) => {
    // If the user deletes a root category, we also need to delete all of its sub categories
    // builder.addCase(
    //   deleteCategory,
    //   (state, action: PayloadAction<RootCategoryType>) => {
    //     const subCategoryIds = action.payload.subCategories;
    //     if (subCategoryIds) {
    //       // subCategoryAdapter.removeMany(state, subCategoryIds);
    //       deleteSubCategories(state, subCategoryIds);
    //     }
    //   }
    // );

    // If the user adds a todo item, we also need to store of that todo's id
    builder.addCase(addTodo, (state, action: PayloadAction<TodoType>) => {
      const parentIdOfTodo = action.payload.parentId;
      // current sub category or parent of todo
      const subCategory = state.entities[parentIdOfTodo];
      const todoList = subCategory?.todoList || [];
      if (subCategory && !todoList.includes(action.payload.id)) {
        subCategory.todoList = todoList.concat(action.payload.id);
      }
    });
    // If the user deletes todo item, we also need to remove from parent as it stores the ids of each todo items.
    builder.addCase(deleteTodo, (state, action: PayloadAction<TodoType>) => {
      const parentIdOfTodo = action.payload.parentId;
      // current sub category or parent of todo
      const subCategory = state.entities[parentIdOfTodo];

      if (subCategory) {
        const todoList = subCategory.todoList || [];
        subCategory.todoList = todoList.filter(
          (todoId) => todoId !== action.payload.id
        );
      }
    });
  },
});

export const {
  selectAll: selectAllSubCategories,
  selectById: selectSubCategoryById,
} = subCategoryAdapter.getSelectors<RootState>((state) => state.subCategories);

export const { createSubCategory, updateSubCategory, deleteSubCategory } =
  subCategorySlice.actions;

const subCategoryReducer = subCategorySlice.reducer;
export default subCategoryReducer;
