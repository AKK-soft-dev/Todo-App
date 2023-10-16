import { TbCategoryFilled } from "react-icons/tb";
import { mock_data } from "../../Home/mock-data";
import SubCategoryItem from "../../reusable/SubCategoryItem/SubCategoryItem";
import CreateButton from "../../reusable/Button/CreateButton";

const SubCategories = () => {
  return (
    <section className="my-10">
      <div className="flex justify-between">
        <h3 className="flex space-x-1 items-center text-sm font-semibold">
          <TbCategoryFilled />
          <span>Sub Categories</span>
        </h3>
        <CreateButton />
      </div>
      <div className="bg-paper my-2 rounded shadow p-2">
        <ul className="my-2 divide-y-2">
          {mock_data.subCategories.map((todo) => (
            <li key={todo.id}>
              <SubCategoryItem data={todo} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SubCategories;
