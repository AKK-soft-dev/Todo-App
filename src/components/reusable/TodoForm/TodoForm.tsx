import { LuChevronsUpDown } from "react-icons/lu";
import { AiFillClockCircle } from "react-icons/ai";
import { MdOutlineDateRange } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";
import { TodoFormPropsType } from "./types";
import { TodoLevelType } from "../TodoItem/types";
import { toast } from "react-toastify";

const TodoForm = (props: TodoFormPropsType) => {
  const updateFormType = props.type === "update";

  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [dueDate, setDueDate] = useState<Date | null>(
    updateFormType ? new Date(props.todo.dueDate) : null
  );

  const [level, setLevel] = useState<TodoLevelType>(
    updateFormType ? props.todo.level : "medium"
  );
  const [formData, setFormData] = useState({
    title: updateFormType ? props.todo.title : "",
    description: updateFormType ? props.todo.description : "",
  });

  const parent = useRef<HTMLButtonElement>(null);

  const toggleDropDown = () => {
    setDropDownOpen((prev) => !prev);
  };

  const handleSelect = (level: TodoLevelType) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setLevel(level);
    toggleDropDown();
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Todo added!", { autoClose: 3000, position: "top-right" });
  };

  useEffect(() => {
    parent.current && autoAnimate(parent.current, { duration: 100 });
  }, []);

  return (
    <section>
      <h1 className="text-xl font-bold my-2 text-center lg:text-start">
        {props.type === "update" ? "Update" : "Create"} Todo{" "}
        <span className="text-sm">(under {props.parentId})</span>
      </h1>
      <div className="mt-5 sm:flex sm:justify-center lg:justify-start">
        <form onSubmit={handleSubmit} className="block sm:inline-flex flex-col">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex gap-2 flex-col-reverse sm:flex-row">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
                className="px-5 py-2 font-semibold placeholder:text-black/60 outline-none border border-black/30 focus:border-black/60 duration-200 rounded block sm:inline-block"
              />
              <button
                type="button"
                ref={parent}
                onClick={toggleDropDown}
                className={`relative flex w-[120px] items-center justify-between px-3 py-2 space-x-1 bg-white rounded border border-black/30 font-semibold duration-200 ${
                  dropDownOpen ? "border-black/60" : ""
                }`}
              >
                <span>{level}</span>
                <LuChevronsUpDown />

                {/** Drop down */}
                {dropDownOpen && (
                  <ul className="absolute w-[100px] z-30 top-full right-0 border border-black/60 bg-white text-start rounded shadow-md">
                    <li
                      onClick={handleSelect("low")}
                      className="px-3 py-1 hover:bg-slate-200 duration-200"
                    >
                      low
                    </li>
                    <li
                      onClick={handleSelect("medium")}
                      className="px-3 py-1 hover:bg-slate-200 duration-200"
                    >
                      medium
                    </li>
                    <li
                      onClick={handleSelect("high")}
                      className="px-3 py-1 hover:bg-slate-200 duration-200"
                    >
                      high
                    </li>
                  </ul>
                )}
              </button>
            </div>
            <div>
              <DatePicker
                showIcon
                icon={
                  <span>
                    <MdOutlineDateRange />
                  </span>
                }
                minDate={new Date()}
                selected={dueDate}
                dateFormat="dd-MM-yyyy"
                onChange={(newDate) => {
                  setDueDate(newDate);
                }}
                placeholderText="Pick due date"
                className="font-semibold placeholder:text-black"
              />
            </div>
          </div>
          <div className="mt-5">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              id=""
              rows={10}
              className="w-full px-5 py-2 font-medium placeholder:text-black/60 outline-none border border-black/30 focus:border-black/60 duration-200 rounded"
            ></textarea>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-black/60">
              {updateFormType ? (
                <span className="flex items-center space-x-1">
                  <AiFillClockCircle />
                  <span>{props.todo.createdAt}</span>
                </span>
              ) : (
                ""
              )}
            </span>
            <button className="px-5 py-2 bg-black text-white mt-5 hover:bg-black/80 active:bg-black rounded duration-200 inline-block">
              {updateFormType ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default TodoForm;
