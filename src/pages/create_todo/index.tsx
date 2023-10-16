import Breadcrumb from "../../components/reusable/Breadcrumb/Breadcrumb";
import TodoForm from "../../components/reusable/TodoForm/TodoForm";

const CreateTodoPage = () => {
  return (
    <>
      <div className="mt-5 mb-3">
        <Breadcrumb overrideItems={["Personal", "Homework"]} />
      </div>
      <TodoForm type="create" parentId="Personal" />
    </>
  );
};

export default CreateTodoPage;
