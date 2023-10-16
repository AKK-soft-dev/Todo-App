import { LuListTodo } from "react-icons/lu";

const Logo = () => {
  return (
    <a
      href="/"
      aria-label="application logo"
      className="relative flex items-center space-x-1 font-bold text-xl select-none"
    >
      <LuListTodo /> <span>TODO</span>
    </a>
  );
};

export default Logo;
