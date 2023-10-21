import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef, memo } from "react";
import { LuListTodo } from "react-icons/lu";
import SearchResultTodoItem from "./SearchResultTodoItem";
import { useAppSelector } from "../../../../redux/hooks";
import { selectAllTodo } from "../../../../redux/features/todo/todoSlice";
import { SearchContainerProps } from "../types";

const SearchResultTodoListContainer = ({
  query,
  closeSearchModal,
}: SearchContainerProps) => {
  const todoList = useAppSelector(selectAllTodo);
  const containerRef = useRef<HTMLDivElement>(null);
  const listParentRef = useRef<HTMLUListElement>(null);
  const containerEl = containerRef.current;
  const listParentEl = listParentRef.current;
  useEffect(() => {
    containerEl && autoAnimate(containerEl);
    listParentEl && autoAnimate(listParentEl);
  }, [containerEl, listParentEl]);

  const regex = new RegExp(query, "i"); // 'i' flag for case-insensitive search
  function containsQueryString(inputString: string) {
    return query && regex.test(inputString);
  }

  const filteredTodoList = todoList.filter(
    (todo) =>
      containsQueryString(todo.title) || containsQueryString(todo.description)
  );

  const shouldDisplay = filteredTodoList.length > 0;
  return (
    <>
      {shouldDisplay && (
        <div className="mt-3 bg-white">
          <h3 className="flex space-x-1 items-center text-sm font-semibold">
            <LuListTodo />
            <span>Todo</span>
          </h3>
          <div ref={containerRef}>
            <ul className="my-2 divide-y-2" ref={listParentRef}>
              {filteredTodoList.map((filteredTodo) => (
                <li key={filteredTodo.id} onClick={closeSearchModal}>
                  <SearchResultTodoItem data={filteredTodo} query={query} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(SearchResultTodoListContainer);
