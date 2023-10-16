import { CategoryType } from "../reusable/SubCategoryItem/types";
import { TodoType } from "../reusable/TodoItem/types";

export const mock_data: {
  subCategories: CategoryType[];
  todoList: TodoType[];
} = {
  subCategories: [
    {
      id: 1,
      name: "Demo Category 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores assumenda reprehenderit voluptatum.",
      createdAt: "3 days ago",
    },
    {
      id: 2,
      name: "Demo Category 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores assumenda reprehenderit voluptatum.",
      createdAt: "5 days ago",
    },
    {
      id: 3,
      name: "Demo Category 3",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores assumenda reprehenderit voluptatum.",
      createdAt: "13 days ago",
    },
  ],
  todoList: [
    {
      id: 1,
      title: "Todo 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores assumenda reprehenderit voluptatum.",
      level: "low",
      createdAt: "3 mins ago",
      dueDate: "01/12/2023",
    },
    {
      id: 2,
      title: "Todo 2",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque porro ducimus, nulla dolorem minus fugit totam eaque quisquam veritatis earum ullam autem maxime minima eveniet, rerum iusto omnis? Dolor, officia?",
      createdAt: "5 hrs ago",
      level: "high",
      dueDate: "03/12/2023",
    },
    {
      id: 3,
      title: "Todo 3",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores assumenda reprehenderit voluptatum.",
      level: "medium",
      createdAt: "31 mins ago",
      dueDate: "04/12/2023",
    },
  ],
};
