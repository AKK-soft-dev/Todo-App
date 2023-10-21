import { LuChevronsUpDown } from "react-icons/lu";
import { AiFillClockCircle } from "react-icons/ai";
import { MdOutlineDateRange } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";
import { TodoFormPropsType } from "./types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectCategoryById } from "../../../redux/features/category/categorySlice";
import { selectSubCategoryById } from "../../../redux/features/subCategory/subCategorySlice";
import { formatDistanceToNow } from "date-fns";
import { addTodo, updateTodo } from "../../../redux/features/todo/todoSlice";
import Alert from "../Alert/Alert";
import { TodoLevelType } from "../../../redux/features/featureTypes";

const TodoForm = (props: TodoFormPropsType) => {
  const updateFormType = props.type === "update";

  const navigateTo = useNavigate();
  const dispatch = useAppDispatch();

  const [dropDownOpen, setDropDownOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: updateFormType ? props.todo?.title : "",
    description: updateFormType ? props.todo?.description : "",
  });
  const [formError, setFormError] = useState<{
    errorAt: "title" | "description" | "dueDate";
    warnType?: boolean;
    message: string;
  } | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(
    updateFormType
      ? props.todo?.dueDate
        ? new Date(props.todo.dueDate)
        : null
      : null
  );
  const [level, setLevel] = useState<TodoLevelType>(
    updateFormType ? props.todo?.level : "medium"
  );

  // this category will be used when this form is CreateFormType
  const category = useAppSelector(
    (state) =>
      selectCategoryById(state, props.parentId) ||
      selectSubCategoryById(state, props.parentId)
  );

  // to animate dropdown
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
    if (name === "title") {
      if (value.length >= 60) {
        setFormError({
          errorAt: "title",
          warnType: true,
          message: "Maximum characters of title must be 60!",
        });
        return;
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.length) {
      setFormError({
        errorAt: "title",
        message: "Please fill out to-do's title!",
      });
      return;
    }

    if (!dueDate) {
      setFormError({
        errorAt: "dueDate",
        message: "Please pick the due date!",
      });
      return;
    }

    if (!formData.description?.length) {
      setFormError({
        errorAt: "description",
        message: "Please fill out description!",
      });
      return;
    }

    if (!updateFormType && category && dueDate) {
      dispatch(
        addTodo({
          title: formData.title,
          description: formData.description,
          parentId: category.id,
          createdAt: new Date().toISOString(),
          dueDate: dueDate.toISOString(),
          done: false,
          level,
        })
      );
      navigateTo(`/categories/${category.id}`);
      toast.success("To-do added!", {
        autoClose: 3000,
        position: "top-right",
      });
      return;
    }

    if (updateFormType && dueDate) {
      dispatch(
        updateTodo({
          id: props.todo.id,
          changes: {
            title: formData.title,
            description: formData.description,
            dueDate: dueDate.toISOString(),
            done: false,
            level,
          },
        })
      );
      updateFormType && navigateTo(`/todo/${props.todo.id}`);
      toast.success("To-do updated!", {
        autoClose: 3000,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    parent.current && autoAnimate(parent.current, { duration: 100 });
  }, []);

  if ((updateFormType && !props.todo) || !category) {
    return (
      <section className="my-5">
        <p>Sorry I can't provide you a form. Maybe due to your url.</p>
      </section>
    );
  }

  return (
    <section>
      <h1 className="text-xl font-bold my-2 text-center lg:text-start">
        {props.type === "update" ? "Update" : "Create"} Todo{" "}
        <span className="text-sm">(under {category?.name})</span>
      </h1>
      <div className="mt-5 sm:flex sm:justify-center lg:justify-start">
        <form onSubmit={handleSubmit} className="block sm:inline-flex flex-col">
          <Alert
            show={!!formError}
            warnType={formError?.warnType}
            message={formError?.message || ""}
          />
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex gap-2 flex-col-reverse sm:flex-row">
              <input
                type="text"
                id="todo_title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
                className={`px-5 py-2 font-semibold placeholder:text-black/60 outline-none border ${
                  formError &&
                  formError.errorAt === "title" &&
                  !formError.warnType
                    ? "border-red-500"
                    : "border-black/30"
                } focus:border-black/60 duration-200 rounded block sm:inline-block`}
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
            <div
              className={`rounded ${
                formError && formError.errorAt === "dueDate"
                  ? "outline outline-1 outline-red-500"
                  : ""
              }`}
            >
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
                className={`font-semibold placeholder:text-black`}
              />
            </div>
          </div>
          <div className="mt-5">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              id="todo_description"
              rows={10}
              className={`w-full px-5 py-2 font-medium placeholder:text-black/60 outline-none border ${
                formError && formError.errorAt === "description"
                  ? "outline outline-1 outline-red-500 focus:outline-transparent"
                  : "border-black/30"
              }focus:border-black/60 duration-200 rounded`}
            ></textarea>
          </div>
          <div className="flex justify-between items-center mt-5">
            <span className="text-sm font-medium text-black/60">
              {updateFormType ? (
                <span className="flex items-center space-x-1">
                  <AiFillClockCircle />
                  <span>
                    {formatDistanceToNow(new Date(props.todo.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </span>
              ) : (
                ""
              )}
            </span>
            <button className="px-5 py-2 bg-black text-white hover:bg-black/80 active:bg-black rounded duration-200 inline-block">
              {updateFormType ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default TodoForm;
