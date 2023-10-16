import { AiFillClockCircle } from "react-icons/ai";
import { HiX } from "react-icons/hi";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";
import { CategoryFormPropsType } from "./types";
import { toast } from "react-toastify";

const CategoryFormModal = (props: CategoryFormPropsType) => {
  const updateFormType = props.type === "update";

  const [formData, setFormData] = useState({
    name: updateFormType ? props.category.name : "",
    description: updateFormType ? props.category.description : "",
  });

  const parent = useRef<HTMLButtonElement>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Category created!", {
      autoClose: 3000,
      position: "top-right",
    });
    props.onClose();
  };

  useEffect(() => {
    parent.current && autoAnimate(parent.current, { duration: 100 });
  }, []);

  return (
    <div
      className={`fixed top-0 z-[100] left-0 right-0 bottom-0 bg-black/80 duration-300 ${
        props.open ? "scale-100" : "scale-0 pointer-events-none"
      }`}
    >
      <div className="fixed z-[101] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white rounded p-5 min-w-[90%] md:min-w-[500px]">
        <button
          onClick={props.onClose}
          className="absolute top-5 right-5 text-xl"
        >
          <HiX />
        </button>
        <div>
          <h1 className="text-xl font-bold my-2 text-center lg:text-start flex flex-col items-center md:flex-row gap-1">
            <span>
              {props.type === "update" ? "Update" : "Create"} Category{" "}
            </span>
            {!updateFormType && props.parentId && (
              <span className="text-sm">(under {props.parentId})</span>
            )}
          </h1>
          <div className="mt-5">
            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              className="block flex-col w-full"
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter category's name"
                required
                className="px-5 py-2 w-full font-semibold placeholder:text-black/60 outline-none border border-black/30 focus:border-black/60 duration-200 rounded block"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                rows={10}
                className="w-full mt-5 px-5 py-2 font-medium placeholder:text-black/60 outline-none border border-black/30 focus:border-black/60 duration-200 rounded"
              ></textarea>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-black/60">
                  {updateFormType ? (
                    <span className="flex items-center space-x-1">
                      <AiFillClockCircle />
                      <span>{props.category.createdAt}</span>
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
        </div>
      </div>
    </div>
  );
};

export default CategoryFormModal;
