import { HiX, HiSearch } from "react-icons/hi";
import { SearchModalProps } from "./types";
import { createPortal } from "react-dom";
import SearchResultTodoListContainer from "./SearchResultTodoList/SearchResultTodoListContainer";
import SearchResultCategoriesContainer from "./SearchResultCategories/SearchResultCategoriesContainer";
import { useState, useDeferredValue, useRef, useEffect } from "react";

const SearchModal = ({ open, onClose }: SearchModalProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    const onTransitionEnd = () => {
      open && searchInputRef.current?.focus();
    };
    modalRef.current?.addEventListener("transitionend", onTransitionEnd);

    return () => {
      modalRef.current?.removeEventListener("transitionend", onTransitionEnd);
    };
  }, [open]);

  return createPortal(
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 scale-0 bg-black/80 transition-all duration-300 z-[100]  ${
        open ? "scale-100" : "pointer-events-none delay-150"
      }`}
    >
      <div
        ref={modalRef}
        role="modal"
        className={`fixed z-[101] duration-300 scale-0 ${
          open ? "scale-100 delay-150" : ""
        } top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white rounded p-5 w-[90%] md:w-[600px] xl:w-[800px]`}
      >
        <div className="flex items-center py-2 text-lg border-b border-black/30">
          <span className="">
            <HiSearch />
          </span>
          <input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="outline-none flex-1 px-1"
          />
          <button onClick={onClose} className="">
            <HiX />
          </button>
        </div>
        <div className="overflow-auto h-[500px]">
          <SearchResultCategoriesContainer
            query={deferredQuery}
            closeSearchModal={onClose}
          />
          <SearchResultTodoListContainer
            query={deferredQuery}
            closeSearchModal={onClose}
          />
          {query && (
            <div
              className={`absolute hidden first:block text-black/60 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}
            >
              <p>Cannot find anything!</p>
            </div>
          )}
        </div>
        {!query && (
          <div
            className={`absolute text-black/60 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}
          >
            <p>Search results will appear here.</p>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default SearchModal;
