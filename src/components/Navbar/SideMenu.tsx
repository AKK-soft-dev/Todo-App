import { NavLink } from "react-router-dom";
import { useState } from "react";
import VW from "vw-detector";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import CreateButton from "../reusable/Button/CreateButton";
import CategoryFormModal from "../reusable/CategoryFormModal.tsx/CategoryFormModal";
import { useAppSelector } from "../../redux/hooks";
import { selectAllCategories } from "../../redux/features/category/categorySlice";

const SideMenu = ({
  openSideMenu,
  toggleSideMenu,
}: {
  openSideMenu: boolean;
  toggleSideMenu: () => void;
}) => {
  const [categoryFormModalOpen, setCategoryFormModalOpen] = useState(false);

  const rootCategories = useAppSelector(selectAllCategories);

  const handleCategoryFormModalToggle = () => {
    setCategoryFormModalOpen((prev) => !prev);
  };

  const closeCategoryFormModal = () => {
    setCategoryFormModalOpen(false);
  };

  const toggle = () => {
    if (VW.matchesMediaQuery(VW.breakpoints.down("lg"))) {
      toggleSideMenu();
    }
  };
  return (
    <>
      <aside
        className={`fixed pt-16 z-40 shadow-md text-black left-0 top-0 bottom-0 transition-all duration-300 ${
          openSideMenu
            ? `w-200-sidebar translate-x-0`
            : `w-200-sidebar lg:w-0 slide-out lg:translate-x-0`
        }`}
      >
        <div className="bg-default relative w-full text-black h-full px-4 py-5  whitespace-nowrap">
          <div
            className="absolute top-4 left-full lg:hidden text-white bg-black p-3 text-xl shadow"
            onClick={toggleSideMenu}
          >
            <HiChevronLeft />
          </div>
          <CreateButton
            className="ml-auto my-2"
            onClick={handleCategoryFormModalToggle}
          />
          <ul className="text-sm font-medium flex flex-col items-center space-y-1 w-full">
            {rootCategories.map(({ id, name }) => (
              <li className="w-full" key={id}>
                <NavLink
                  to={`/categories/${id}`}
                  onClick={toggle}
                  className={({ isActive }) =>
                    `w-full p-3 relative flex justify-between items-center rounded hover:bg-slate-200  transition-all ${
                      isActive ? "bg-slate-200" : ""
                    }`
                  }
                >
                  <span className="w-[80%] block truncate">{name}</span>
                  <span className="absolute right-3">
                    <HiChevronRight />
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <CategoryFormModal
        type="create"
        open={categoryFormModalOpen}
        onClose={closeCategoryFormModal}
      />
    </>
  );
};

export default SideMenu;
