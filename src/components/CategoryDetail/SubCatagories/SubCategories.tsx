import { TbCategoryFilled } from "react-icons/tb";
import { BiSortAlt2 } from "react-icons/bi";
import autoAnimate from "@formkit/auto-animate";
import { useRef, useEffect, useState, useMemo } from "react";
import SubCategoryItem from "../../reusable/SubCategoryItem/SubCategoryItem";
import CreateButton from "../../reusable/Button/CreateButton";
import { useAppSelector } from "../../../redux/hooks";
import { selectSubCategoryById } from "../../../redux/features/subCategory/subCategorySlice";
import store, { RootState } from "../../../redux/store";
import { createSelector } from "@reduxjs/toolkit";
import CategoryFormModal from "../../reusable/CategoryFormModal.tsx/CategoryFormModal";
import { sortWithCharacters, sortWithDate } from "../../../utils/sorters";

type CategoriesSortType = "newest" | "oldest" | "A - Z" | "Z - A";

const subCategoryIdsSelector = (
  state: RootState,
  underRootParent: boolean,
  parentId: string
) => {
  return underRootParent
    ? state.categories.entities[parentId]?.subCategories
    : state.subCategories.entities[parentId]?.subCategories;
};

const subCategoriesSelector = createSelector(
  [subCategoryIdsSelector],
  (subCategoryIds) => {
    return subCategoryIds?.map((subCategoryId) =>
      selectSubCategoryById(store.getState(), subCategoryId)
    );
  }
);

const SubCategories = ({
  underRootParent,
  parentId,
}: {
  underRootParent: boolean;
  parentId: string;
}) => {
  const [sortBy, setSortBy] = useState<CategoriesSortType>("newest");
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);

  // to animate dropdown
  const dropdownParent = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listParentRef = useRef<HTMLUListElement>(null);

  const containerEl = containerRef.current;
  const listParentEl = listParentRef.current;
  useEffect(() => {
    containerEl && autoAnimate(containerEl);
    listParentEl && autoAnimate(listParentEl);
  }, [containerEl, listParentEl]);

  const subCategories =
    useAppSelector((state) =>
      subCategoriesSelector(state, underRootParent, parentId)
    ) || [];

  const sortedCategories = useMemo(() => {
    return subCategories.sort((category1, category2) => {
      if (category1 && category2) {
        switch (sortBy) {
          case "newest":
          case "oldest":
            return sortWithDate(
              category2.createdAt,
              category1.createdAt,
              sortBy === "newest"
            );
          case "A - Z":
          case "Z - A":
            return sortWithCharacters(
              category1.name,
              category2.name,
              sortBy === "A - Z"
            );
        }
      }
      return 0;
    });
  }, [subCategories, sortBy]);

  const toggleFormModal = () => {
    setFormModalOpen((prev) => !prev);
  };

  const closeFormModal = () => {
    setFormModalOpen(false);
  };

  const toggleDropDown = () => {
    setDropDownOpen((prev) => !prev);
  };

  const handleSelect =
    (sortType: CategoriesSortType) => (e: React.MouseEvent) => {
      e.stopPropagation();
      setSortBy(sortType);
      toggleDropDown();
    };

  useEffect(() => {
    dropdownParent.current &&
      autoAnimate(dropdownParent.current, { duration: 100 });
  }, []);

  return (
    <>
      <section className="my-10">
        <div className="flex justify-between">
          <h3 className="flex space-x-1 items-center text-sm font-semibold">
            <TbCategoryFilled />
            <span>Sub Categories</span>
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
                <ul className="absolute w-[100px] divide-y-2 z-30 top-full right-0 border border-black/60 bg-white text-start rounded shadow-md">
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

            <CreateButton onClick={toggleFormModal} />
          </div>
        </div>
        <div ref={containerRef} className="bg-paper my-2 rounded shadow p-2">
          {sortedCategories.length > 0 ? (
            <ul className="my-2 divide-y-2" ref={listParentRef}>
              {sortedCategories.map(
                (subCategory) =>
                  subCategory && (
                    <li key={subCategory.id}>
                      <SubCategoryItem data={subCategory} />
                    </li>
                  )
              )}
            </ul>
          ) : (
            <p className="text-center text-sm font-semibold text-black/60 py-5">
              No categories here. Create a new one.
            </p>
          )}
        </div>
      </section>
      <CategoryFormModal
        type="create"
        open={formModalOpen}
        onClose={closeFormModal}
        parentId={parentId}
      />
    </>
  );
};

export default SubCategories;
