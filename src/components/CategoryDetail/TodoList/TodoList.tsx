import { LuListTodo } from "react-icons/lu";
import autoAnimate from "@formkit/auto-animate";
import { useRef, useEffect } from "react";
import TodoItem from "../../reusable/TodoItem/TodoItem";
import CreateButton from "../../reusable/Button/CreateButton";
import { selectTodoById } from "../../../redux/features/todo/todoSlice";
import { useAppSelector } from "../../../redux/hooks";
import store, { RootState } from "../../../redux/store";
import { createSelector } from "@reduxjs/toolkit";

const todoIdsSelector = (
  state: RootState,
  underRootParent: boolean,
  parentId: string
) => {
  return underRootParent
    ? state.categories.entities[parentId]?.todoList
    : state.subCategories.entities[parentId]?.todoList;
};

const todoListSelector = createSelector([todoIdsSelector], (todoIds) => {
  return todoIds?.map((todoId) => selectTodoById(store.getState(), todoId));
});

const TodoList = ({
  underRootParent,
  parentId,
}: {
  underRootParent: boolean;
  parentId: string;
}) => {
  const parent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, []);

  const todoList =
    useAppSelector((state) =>
      todoListSelector(state, underRootParent, parentId)
    ) || [];

  return (
    <section className="my-10">
      <div className="flex justify-between">
        <h3 className="flex space-x-1 items-center text-sm font-semibold">
          <LuListTodo />
          <span>Todo</span>
        </h3>
        <CreateButton />
      </div>

      <div ref={parent} className="bg-paper my-2 rounded shadow p-2">
        {todoList.length > 0 ? (
          <ul className="my-2 divide-y-2">
            {todoList.map(
              (todo) =>
                todo && (
                  <li key={todo.id}>
                    <TodoItem data={todo} />
                  </li>
                )
            )}
          </ul>
        ) : (
          <p className="text-center py-5">No todo here. Create a new one.</p>
        )}
      </div>
    </section>
  );
};

export default TodoList;
