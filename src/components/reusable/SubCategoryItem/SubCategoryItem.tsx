import { HiChevronRight } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { SubCategoryType } from "../../../redux/features/featureTypes";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../redux/hooks";
import { deleteSubCategory } from "../../../redux/features/subCategory/subCategorySlice";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

const SubCategoryItem = ({ data }: { data: SubCategoryType }) => {
  const dispatch = useAppDispatch();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteSubCategory(data));
    toast.success("Category deleted!", {
      autoClose: 3000,
      position: "top-right",
    });
  };

  const toggleConfirmMOdal = (e: React.MouseEvent) => {
    e.preventDefault();
    setConfirmModalOpen((prev) => !prev);
  };

  const closeConfirmModal = () => {
    setConfirmModalOpen(false);
  };
  return (
    <article className="relative flex h-16 rounded hover:bg-slate-200 duration-200 cursor-pointer">
      <h2 className="absolute top-0 left-0 right-0 bottom-0 font-semibold flex items-center p-5">
        {data.name}
        <Link
          to={`/categories/${data.id}`}
          className="absolute top-0 left-0 right-0 bottom-0"
        ></Link>
      </h2>
      <div className="absolute top-1/2 -translate-y-1/2 right-5 flex space-x-1">
        <div className="relative z-10" onClick={toggleConfirmMOdal}>
          <AiOutlineDelete />
        </div>
        <HiChevronRight />
      </div>

      <ConfirmModal
        title="Confirm deletion"
        body={
          <>
            Category called <span className="font-bold">{data.name}</span> and
            all of its content will be deleted. It can't be undone.
          </>
        }
        open={confirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleDelete}
      />
    </article>
  );
};

export default SubCategoryItem;
