import { LuListTodo } from "react-icons/lu";
import { BiSortAlt2 } from "react-icons/bi";
import autoAnimate from "@formkit/auto-animate";
import { useRef, useEffect, useState, useMemo } from "react";
import TodoItem from "../../reusable/TodoItem/TodoItem";
import CreateButton from "../../reusable/Button/CreateButton";
import { selectTodoById } from "../../../redux/features/todo/todoSlice";
import { useAppSelector } from "../../../redux/hooks";
import store, { RootState } from "../../../redux/store";
// import { createSelector } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { sortWithCharacters, sortWithDate } from "../../../utils/sorters";

type TodoListSortType =
  | "newest"
  | "oldest"
  | "near"
  | "far"
  | "A - Z"
  | "Z - A";

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
  const [sortBy, setSortBy] = useState<TodoListSortType>("newest");
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const listParentRef = useRef<HTMLUListElement>(null);
  const navigateTo = useNavigate();

  // to animate dropdown
  const dropdownParent = useRef<HTMLButtonElement>(null);
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

  const sortedTodoList = useMemo(() => {
    return todoList.sort((todo1, todo2) => {
      if (todo1 && todo2) {
        switch (sortBy) {
          case "newest":
          case "oldest":
            return sortWithDate(
              todo1.createdAt,
              todo2.createdAt,
              sortBy === "oldest"
            );
          case "near":
          case "far":
            return sortWithDate(
              todo1.dueDate,
              todo2.dueDate,
              sortBy === "near"
            );
          case "A - Z":
          case "Z - A":
            return sortWithCharacters(
              todo1.title,
              todo2.title,
              sortBy === "A - Z"
            );
        }
      }
      return 0;
    });
  }, [todoList, sortBy]);

  const handleNavigate = () => {
    if (parentId) {
      navigateTo(`/create?parent=${parentId}`);
    }
  };

  const handleSelect =
    (sortType: TodoListSortType) => (e: React.MouseEvent) => {
      e.stopPropagation();
      setSortBy(sortType);
      toggleDropDown();
    };

  const toggleDropDown = () => {
    setDropDownOpen((prev) => !prev);
  };

  useEffect(() => {
    dropdownParent.current &&
      autoAnimate(dropdownParent.current, { duration: 100 });
  }, []);

  return (
    <section className="my-10">
      <div className="flex justify-between">
        <h3 className="flex space-x-1 items-center text-sm font-semibold">
          <LuListTodo />
          <span>Todo</span>
        </h3>
        <div className="flex gap-1 items-center">
          <div className="relative">
            <button
              type="button"
              ref={dropdownParent}
              onClick={toggleDropDown}
              className={`relative text-sm flex w-[120px] items-center justify-between px-2 py-1 space-x-1 bg-white rounded border border-black/30 font-semibold duration-200 ${
                dropDownOpen ? "border-black/60" : ""
              }`}
            >
              <span className="text-xs">{sortBy}</span>
              <BiSortAlt2 />
            </button>
            {/** Drop down */}
            {dropDownOpen && (
              <ul className="absolute w-[110px] divide-y-2 z-30 top-full right-0 border border-black/60 bg-white text-start rounded shadow-md">
                <li
                  onClick={handleSelect("newest")}
                  className="px-3 py-1 hover:bg-slate-200 duration-200 text-xs"
                >
                  newest
                </li>
                <li
                  onClick={handleSelect("oldest")}
                  className="px-3 py-1 hover:bg-slate-200 duration-200 text-xs"
                >
                  oldest
                </li>
                <li
                  onClick={handleSelect("near")}
                  className="px-3 py-1 hover:bg-slate-200 duration-200 text-xs"
                >
                  near due date
                </li>
                <li
                  onClick={handleSelect("far")}
                  className="px-3 py-1 hover:bg-slate-200 duration-200 text-xs"
                >
                  far due date
                </li>
                <li
                  onClick={handleSelect("A - Z")}
                  className="px-3 py-1 hover:bg-slate-200 duration-200 text-xs"
                >
                  A - Z
                </li>
                <li
                  onClick={handleSelect("Z - A")}
                  className="px-3 py-1 hover:bg-slate-200 duration-200 text-xs"
                >
                  Z - A
                </li>
              </ul>
            )}
          </div>

          <CreateButton onClick={handleNavigate} />
        </div>
      </div>

      <div ref={containerRef} className="bg-paper my-2 rounded shadow p-2">
        {sortedTodoList.length > 0 ? (
          <ul className="my-2 divide-y-2" ref={listParentRef}>
            {sortedTodoList.map(
              (todo) =>
                todo && (
                  <li key={todo.id}>
                    <TodoItem data={todo} />
                  </li>
                )
            )}
          </ul>
        ) : (
          <p className="text-center text-sm font-semibold text-black/60 py-5">
            No to-do here. Create a new one.
          </p>
        )}
      </div>
    </section>
  );
};

export default TodoList;
