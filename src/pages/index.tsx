import { addDays, isAfter, isBefore, isToday, isTomorrow } from "date-fns";
import { selectAllTodo } from "../redux/features/todo/todoSlice";
import { useAppSelector } from "../redux/hooks";
import { TodoType } from "../redux/features/featureTypes";
import TodoListWithSpecificDays from "../components/reusable/TodoListWithSpecificDays/TodoListWithSpecificDays";
import { formatDateToStr } from "../utils/formatDate";

const HomePage = () => {
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const next7Days = addDays(tomorrow, 7);
  const next30Days = addDays(next7Days, 30);

  const todayTodo: TodoType[] = [];
  const tomorrowTodo: TodoType[] = [];
  const next7DaysTodo: TodoType[] = [];
  const next30DaysTodo: TodoType[] = [];

  const todoList = useAppSelector(selectAllTodo);

  todoList.forEach((todo) => {
    const dueDate = new Date(todo.dueDate);
    if (isToday(dueDate)) {
      todayTodo.push(todo);
    } else if (isTomorrow(dueDate)) {
      tomorrowTodo.push(todo);
    } else if (isAfter(dueDate, tomorrow) && isBefore(dueDate, next7Days)) {
      next7DaysTodo.push(todo);
    } else if (isAfter(dueDate, next7Days) && isBefore(dueDate, next30Days)) {
      next30DaysTodo.push(todo);
    }
  });

  return (
    <div className="flex flex-col">
      <TodoListWithSpecificDays
        title="Today"
        dateStr={formatDateToStr(today, true)}
        messageOnEmptyList="You don't have any tasks for today"
        todoList={todayTodo}
      />
      <TodoListWithSpecificDays
        title="Tomorrow"
        dateStr={formatDateToStr(tomorrow, true)}
        messageOnEmptyList="You don't have any tasks for tomorrow"
        todoList={tomorrowTodo}
      />
      <TodoListWithSpecificDays
        title="Next 7 Days"
        dateStr={`${formatDateToStr(
          addDays(tomorrow, 1),
          true
        )} - ${formatDateToStr(next7Days, true)}`}
        messageOnEmptyList="You don't have any tasks for the next 7 days"
        todoList={next7DaysTodo}
      />
      <TodoListWithSpecificDays
        title="Next 30 Days"
        dateStr={`${formatDateToStr(
          addDays(next7Days, 1),
          true
        )} - ${formatDateToStr(next30Days, true)}`}
        messageOnEmptyList="You don't have any tasks for the next 30 days"
        todoList={next30DaysTodo}
      />
    </div>
  );
};

export default HomePage;
