import { LuListTodo } from "react-icons/lu";
import { mock_data } from "../../Home/mock-data";
import TodoItem from "../../reusable/TodoItem/TodoItem";
import CreateButton from "../../reusable/Button/CreateButton";

const TodoList = () => {
  return (
    <section className="my-10">
      <div className="flex justify-between">
        <h3 className="flex space-x-1 items-center text-sm font-semibold">
          <LuListTodo />
          <span>Todo</span>
        </h3>
        <CreateButton />
      </div>

      <div className="bg-paper my-2 rounded shadow p-2">
        <ul className="my-2 divide-y-2">
          {mock_data.todoList.map((todo) => (
            <li key={todo.id}>
              <TodoItem data={todo} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TodoList;
