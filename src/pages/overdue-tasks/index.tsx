import { createSelector } from "@reduxjs/toolkit";
import { TodoType } from "../../redux/features/featureTypes";
import { selectAllTodo } from "../../redux/features/todo/todoSlice";
import { useAppSelector } from "../../redux/hooks";
import { MdOutlineUpdate } from "react-icons/md";
import { format, isAfter } from "date-fns";
import OverdueInfoTodoItem from "../../components/reusable/TodoItem/OverdueInfoTodoItem";

const selectCompletedTodoItems = createSelector(
  [selectAllTodo],
  (todoList: TodoType[]) => {
    return todoList.filter(
      (todo) => !todo.done && isAfter(new Date(), new Date(todo.dueDate))
    );
  }
);

const sortedTodoListSelector = createSelector(
  [selectCompletedTodoItems],
  (todoList: TodoType[]) => {
    return todoList.sort(
      (todo1, todo2) =>
        new Date(todo1.doneAt!).valueOf() - new Date(todo2.doneAt!).valueOf()
    );
  }
);

const categorizedTodoListSelector = createSelector(
  [sortedTodoListSelector],
  (todoList: TodoType[]) => {
    const categorizedTodoList: { [key: string]: TodoType[] } = {};
    todoList.forEach((todo) => {
      const overDueDate = format(new Date(todo.dueDate), "MMMM d, yyyy");
      const category = categorizedTodoList[overDueDate] || [];
      categorizedTodoList[overDueDate] = category.concat(todo);
    });
    return categorizedTodoList;
  }
);

const CompletedTasksPage = () => {
  const categorizedTodoList = useAppSelector(categorizedTodoListSelector);

  const categoryNames = Object.keys(categorizedTodoList);
  return (
    <div>
      <h1 className="text-xl font-bold my-3 flex items-center gap-1">
        <MdOutlineUpdate />
        <span>Overdue Tasks</span>
      </h1>
      <div className="mt-10">
        {categoryNames.length > 0 ? (
          categoryNames.map((categoryKey) => (
            <div key={categoryKey} className="my-10">
              <h2 className="text-sm font-semibold">{categoryKey}</h2>
              <ul className="bg-paper my-1 rounded shadow p-2 divide-y-2">
                {categorizedTodoList[categoryKey].map((todo) => (
                  <li key={todo.id}>
                    <OverdueInfoTodoItem data={todo} />
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>You don't have any overdue tasks!</p>
        )}
      </div>
    </div>
  );
};

export default CompletedTasksPage;
