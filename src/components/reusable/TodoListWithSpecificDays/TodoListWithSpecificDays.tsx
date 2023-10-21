import { TodoType } from "../../../redux/features/featureTypes";
import TodoItem from "../TodoItem/TodoItem";

const TodoListWithSpecificDays = ({
  title,
  dateStr,
  messageOnEmptyList,
  todoList,
}: {
  title: string;
  dateStr: string;
  messageOnEmptyList: string;
  todoList: TodoType[];
}) => {
  return (
    <section className="my-5">
      <h1 className="text-xl font-bold space-x-1">
        <span>{title}</span>
        <span className="text-xs font-semibold text-black/60">({dateStr})</span>
      </h1>
      <div className="bg-paper my-2 rounded shadow p-2">
        {todoList.length > 0 ? (
          <ul className="my-2 divide-y-2">
            {todoList.map((todo) => (
              <li key={todo.id}>
                <TodoItem data={todo} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-black/60 font-semibold p-5">
            {messageOnEmptyList}
          </p>
        )}
      </div>
    </section>
  );
};

export default TodoListWithSpecificDays;
