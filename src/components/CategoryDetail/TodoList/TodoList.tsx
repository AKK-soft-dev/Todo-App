import { LuListTodo } from "react-icons/lu";
import autoAnimate from "@formkit/auto-animate";
import { useRef, useEffect } from "react";
import TodoItem from "../../reusable/TodoItem/TodoItem";
import CreateButton from "../../reusable/Button/CreateButton";
import { selectTodoById } from "../../../redux/features/todo/todoSlice";
import { useAppSelector } from "../../../redux/hooks";
import store, { RootState } from "../../../redux/store";
// import { createSelector } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const todoIdsSelector = (
  state: RootState,
  underRootParent: boolean,
  parentId: string
) => {
  return underRootParent
    ? state.categories.entities[parentId]?.todoList
    : state.subCategories.entities[parentId]?.todoList;
};

// const todoListSelector = createSelector([todoIdsSelector], (todoIds) => {
//   return todoIds?.map((todoId) => selectTodoById(store.getState(), todoId));
// });

const todoListSelector = (todoIds: string[]) => {
  return todoIds?.map((todoId) => selectTodoById(store.getState(), todoId));
};

const TodoList = ({
  underRootParent,
  parentId,
}: {
  underRootParent: boolean;
  parentId: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const listParentRef = useRef<HTMLUListElement>(null);
  const navigateTo = useNavigate();

  const containerEl = containerRef.current;
  const listParentEl = listParentRef.current;
  useEffect(() => {
    containerEl && autoAnimate(containerEl);
    listParentEl && autoAnimate(listParentEl);
  }, [containerEl, listParentEl]);

  // const todoList =
  //   useAppSelector((state) =>
  //     todoListSelector(state, underRootParent, parentId)
  //   ) || [];

  const todoList =
    useAppSelector((state) => {
      const todoIds = todoIdsSelector(state, underRootParent, parentId);
      return todoListSelector(todoIds!);
    }) || [];

  const handleNavigate = () => {
    if (parentId) {
      navigateTo(`/create?parent=${parentId}`);
    }
  };

  return (
    <section className="my-10">
      <div className="flex justify-between">
        <h3 className="flex space-x-1 items-center text-sm font-semibold">
          <LuListTodo />
          <span>Todo</span>
        </h3>
        <CreateButton onClick={handleNavigate} />
      </div>

      <div ref={containerRef} className="bg-paper my-2 rounded shadow p-2">
        {todoList.length > 0 ? (
          <ul className="my-2 divide-y-2" ref={listParentRef}>
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
          <p className="text-center text-black/60 py-5">
            No to-do here. Create a new one.
          </p>
        )}
      </div>
    </section>
  );
};

export default TodoList;
