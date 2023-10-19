import {
  EntityState,
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { SubCategoryType, TodoType } from "../featureTypes";
import { RootState } from "../../store";
import { initialTodoData } from "./initialData";
import { nanoid } from "nanoid";
import { deleteSubCategory } from "../subCategory/subCategorySlice";
import { initialTodoListFromStorage } from "../storageData";

export const todoAdapter = createEntityAdapter<TodoType>();

const initialState =
  initialTodoListFromStorage ||
  initialTodoData ||
  todoAdapter.getInitialState();

const todoSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addTodo: {
      reducer: todoAdapter.addOne,
      prepare: (todo: Omit<TodoType, "id">) => {
        return {
          payload: {
            id: nanoid(),
            ...todo,
          },
        };
      },
    },
    updateTodo: todoAdapter.updateOne,
    deleteTodo: (
      state: EntityState<TodoType>,
      action: PayloadAction<TodoType>
    ) => {
      todoAdapter.removeOne(state, action.payload.id);
    },
  },
  extraReducers: (builder) => {
    // If the user deletes a root category, we also need to delete all of its todo items
    // builder.addCase(
    //   deleteCategory,
    //   (state, action: PayloadAction<RootCategoryType>) => {
    //     const todoIds = action.payload.todoList;
    //     if (todoIds) {
    //       todoAdapter.removeMany(state, todoIds);
    //     }
    //   }
    // );

    // we need to remove all todo of deleted subCategory
    builder.addCase(
      deleteSubCategory,
      (state, action: PayloadAction<SubCategoryType>) => {
        const todoIdsOfSubCategory = action.payload.todoList;
        if (todoIdsOfSubCategory) {
          todoAdapter.removeMany(state, todoIdsOfSubCategory);
        }
      }
    );
  },
});

export const { selectAll: selectAllTodo, selectById: selectTodoById } =
  todoAdapter.getSelectors<RootState>((state) => state.todoList);

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;

const todoReducer = todoSlice.reducer;
export default todoReducer;
