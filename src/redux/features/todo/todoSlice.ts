import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { TodoType } from "../featureTypes";
import { RootState } from "../../store";
import { initialTodoData } from "./initialData";
import { nanoid } from "nanoid";

const todoAdapter = createEntityAdapter<TodoType>();

const initialState = initialTodoData || todoAdapter.getInitialState();

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
  },
});

export const { selectAll: selectAllTodo, selectById: selectTodoById } =
  todoAdapter.getSelectors<RootState>((state) => state.todoList);

export const { addTodo, updateTodo } = todoSlice.actions;

const todoReducer = todoSlice.reducer;
export default todoReducer;
