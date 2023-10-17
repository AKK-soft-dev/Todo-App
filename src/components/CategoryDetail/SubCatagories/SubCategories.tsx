import { TbCategoryFilled } from "react-icons/tb";
import autoAnimate from "@formkit/auto-animate";
import { useRef, useEffect } from "react";
import SubCategoryItem from "../../reusable/SubCategoryItem/SubCategoryItem";
import CreateButton from "../../reusable/Button/CreateButton";
import { useAppSelector } from "../../../redux/hooks";
import { selectSubCategoryById } from "../../../redux/features/subCategory/subCategorySlice";
import store, { RootState } from "../../../redux/store";
import { createSelector } from "@reduxjs/toolkit";

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
  const parent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, []);

  const subCategories =
    useAppSelector((state) =>
      subCategoriesSelector(state, underRootParent, parentId)
    ) || [];

  return (
    <section className="my-10">
      <div className="flex justify-between">
        <h3 className="flex space-x-1 items-center text-sm font-semibold">
          <TbCategoryFilled />
          <span>Sub Categories</span>
        </h3>
        <CreateButton />
      </div>
      <div className="bg-paper my-2 rounded shadow p-2" ref={parent}>
        {subCategories.length > 0 ? (
          <ul className="my-2 divide-y-2">
            {subCategories.map(
              (subCategory) =>
                subCategory && (
                  <li key={subCategory.id}>
                    <SubCategoryItem data={subCategory} />
                  </li>
                )
            )}
          </ul>
        ) : (
          <p className="text-center py-5">
            No categories here. Create a new one.
          </p>
        )}
      </div>
    </section>
  );
};

export default SubCategories;
