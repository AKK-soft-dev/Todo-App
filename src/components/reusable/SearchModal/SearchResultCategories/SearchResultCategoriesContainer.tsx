import { TbCategoryFilled } from "react-icons/tb";
import { SearchContainerProps } from "../types";
import { useAppSelector } from "../../../../redux/hooks";
import { selectAllCategories } from "../../../../redux/features/category/categorySlice";
import SearchResultCategoryItem from "./SearchResultCategoryItem";
import { memo, useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import { selectAllSubCategories } from "../../../../redux/features/subCategory/subCategorySlice";

const SearchResultCategoriesContainer = ({
  query,
  closeSearchModal,
}: SearchContainerProps) => {
  const rootCategories = useAppSelector(selectAllCategories);
  const subCategories = useAppSelector(selectAllSubCategories);
  const regex = new RegExp(query, "i"); // 'i' flag for case-insensitive search

  const containerRef = useRef<HTMLDivElement>(null);
  const listParentRef = useRef<HTMLUListElement>(null);
  const containerEl = containerRef.current;
  const listParentEl = listParentRef.current;

  useEffect(() => {
    containerEl && autoAnimate(containerEl);
    listParentEl && autoAnimate(listParentEl);
  }, [containerEl, listParentEl]);

  function containsQueryString(inputString: string) {
    return query && regex.test(inputString);
  }

  const filteredRootCategories = rootCategories.filter(
    (category) =>
      containsQueryString(category.name) ||
      containsQueryString(category.description || "")
  );
  const filteredSubCategories = subCategories.filter(
    (category) =>
      containsQueryString(category.name) ||
      containsQueryString(category.description || "")
  );

  const shouldDisplay =
    filteredRootCategories.length > 0 || filteredSubCategories.length > 0;

  return (
    <>
      {shouldDisplay && (
        <div className={`mt-3 bg-white`}>
          <h3 className="flex space-x-1 items-center text-sm font-semibold">
            <TbCategoryFilled />
            <span>Category</span>
          </h3>
          <div ref={containerRef}>
            <ul className="my-2 divide-y-2" ref={listParentRef}>
              {filteredRootCategories.map((filteredCategory) => (
                <li key={filteredCategory.id} onClick={closeSearchModal}>
                  <SearchResultCategoryItem
                    data={filteredCategory}
                    query={query}
                  />
                </li>
              ))}
              {filteredSubCategories.map((filteredCategory) => (
                <li key={filteredCategory.id} onClick={closeSearchModal}>
                  <SearchResultCategoryItem
                    data={filteredCategory}
                    query={query}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(SearchResultCategoriesContainer);
