import { FaPlus } from "react-icons/fa";

const CreateButton = ({
  className,
  ...others
}: React.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`flex items-center space-x-1 px-2 py-1 rounded bg-black hover:bg-black/80 active:bg-black duration-200 text-white border border-black text-sm ${className}`}
      {...others}
    >
      <FaPlus />
      <span className="text-xs">NEW</span>
    </button>
  );
};

export default CreateButton;
