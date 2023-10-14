import { HiX } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import VW from "vw-detector";

const pages = [
  { path: "/", name: "Home" },
  { path: "/products", name: "Products" },
  { path: "/order-list", name: "Order List" },
  { path: "/categories", name: "Categories" },
  { path: "/blah", name: "Blah" },
];

const SideMenu = ({
  openSideMenu,
  toggleSideMenu,
}: {
  openSideMenu: boolean;
  toggleSideMenu: () => void;
}) => {
  const toggle = () => {
    if (VW.matchesMediaQuery(VW.breakpoints.down("xl"))) {
      toggleSideMenu();
    }
  };
  return (
    <aside
      className={`fixed pt-16 shadow-md text-black left-0 top-0 bottom-0 overflow-hidden transition-all duration-300 ${
        openSideMenu
          ? `w-200-sidebar translate-x-0`
          : `w-200-sidebar lg:w-0 slide-out lg:translate-x-0`
      }`}
    >
      <div className="bg-default relative w-full text-black/60 h-full px-4 py-5 z-50 whitespace-nowrap">
        <div
          className="absolute top-4 right-4 lg:hidden"
          onClick={toggleSideMenu}
        >
          <HiX />
        </div>
        <ul className="text-sm font-medium flex flex-col items-center space-y-1 w-full">
          {pages.map((page) => (
            <li className="w-full" key={page.path}>
              <NavLink
                to={page.path}
                onClick={toggle}
                className={({ isActive }) =>
                  `w-full p-3 block hover:bg-slate-200 rounded transition-all ${
                    isActive ? "bg-primary/20" : ""
                  }`
                }
              >
                {page.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SideMenu;
