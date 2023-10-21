import { NavLink } from "react-router-dom";
import { MdOutlineUpdate } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";

const MoreMenu = ({ open }: { open: boolean }) => {
  return (
    <div
      className={`absolute top-full -right-2 transition-all duration-200 ${
        open
          ? "opacity-100 -translate-y-5 z-40"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <nav
        className={`mt-10 relative select-none bg-white w-[150px] before:-z-10 shadow-lg text-sm rounded-lg before:absolute before:w-0 before:h-0 before:border-8 before:right-2 before:border-e-transparent before:border-b-transparent before:rotate-45 before:border-white before:transition-all before:duration-300 before:delay-100 ${
          open ? "before:-top-1" : "before:top-0"
        }`}
      >
        <ul className="divide-y-2 text-sm">
          <li>
            <NavLink
              to="/completed-tasks"
              className={({ isActive }) =>
                `px-4 py-2 text-start flex items-center gap-1 hover:bg-slate-200  transition-all ${
                  isActive ? "bg-slate-200" : ""
                }`
              }
            >
              <AiOutlineFileDone />
              <span>Completed</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/overdue-tasks"
              className={({ isActive }) =>
                `px-4 py-2 text-start flex items-center gap-1 hover:bg-slate-200  transition-all ${
                  isActive ? "bg-slate-200" : ""
                }`
              }
            >
              <MdOutlineUpdate />
              <span>Overdue</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MoreMenu;
