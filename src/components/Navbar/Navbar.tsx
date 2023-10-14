import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiSearch } from "react-icons/hi";
import { BsFillPersonFill, BsBellFill } from "react-icons/bs";
import { CgMenuRight } from "react-icons/cg";
import SideMenu from "./SideMenu";
import { useCallback, useEffect, useState } from "react";
import Notification from "../Notification/Notification";
import Logo from "../Logo/Logo";

const Navbar = ({
  openSideMenu,
  toggleSideMenu,
}: {
  openSideMenu: boolean;
  toggleSideMenu: () => void;
}) => {
  const [openNotification, setOpenNotification] = useState(false);

  const toggleNotification: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    setOpenNotification((prev) => !prev);
  };

  const closeNotification = useCallback(() => {
    setOpenNotification(false);
  }, []);

  useEffect(() => {
    document.addEventListener("click", closeNotification);

    return () => {
      document.removeEventListener("click", closeNotification);
    };
  }, [closeNotification]);

  return (
    <header className={`relative text-base transition-all duration-300`}>
      <SideMenu openSideMenu={openSideMenu} toggleSideMenu={toggleSideMenu} />
      <nav className="fixed z-10 bg-default h-16  top-0 left-0 right-0 flex items-center justify-between px-4 lg:px-5 shadow">
        <div className="flex items-center">
          <Logo />
        </div>

        <div className="flex justify-between md:justify-start items-center">
          <div className="w-28 sm:w-52 h-full p-2 py-3 flex items-center bg-white border border-gray-300 rounded-lg cursor-pointer duration-200 hover:bg-slate-100">
            <div className="pointer-events-none flex justify-center text-slate-500">
              <HiSearch />
            </div>

            <span className="block text-sm placeholder:text-gray-400 text-gray-900 pl-2 w-full h-full outline-none">
              Search
            </span>
          </div>

          <div className="ml-4 flex space-x-4 items-center">
            <div
              className="cursor-pointer p-1 text-xl block xl:hidden"
              onClick={toggleSideMenu}
            >
              {openSideMenu ? <CgMenuRight /> : <GiHamburgerMenu />}
            </div>
            <div
              className="cursor-pointer select-none relative text-xl"
              onClick={toggleNotification}
            >
              <BsBellFill />
              <Notification open={openNotification} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
