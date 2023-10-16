import { EntityState } from "@reduxjs/toolkit";
import { TodoType } from "../featureTypes";

export const initialTodoData: EntityState<TodoType> = {
  ids: [
    "m-nGn5t9_wLwS62YQhk0h",
    "aOOuRi5HhqqfVDlzSv6rb",
    "F5tiwu-xKAy-vh8MAfiLD",
    "a6Gd5CzR5OrJiHXQWcqzg",
  ],
  entities: {
    "m-nGn5t9_wLwS62YQhk0h": {
      id: "m-nGn5t9_wLwS62YQhk0h",
      title: "Todo 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores assumenda reprehenderit voluptatum.",
      parentId: "n4kfA1mTlozkS1ZJgXh2F",
      level: "high",
      createdAt: "13/02/2023",
      dueDate: "12/12/2023",
    },
    aOOuRi5HhqqfVDlzSv6rb: {
      id: "aOOuRi5HhqqfVDlzSv6rb",
      title: "Todo 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores assumenda reprehenderit voluptatum.",
      parentId: "n4kfA1mTlozkS1ZJgXh2F",
      level: "high",
      createdAt: "13/02/2023",
      dueDate: "12/11/2023",
    },
    "F5tiwu-xKAy-vh8MAfiLD": {
      id: "F5tiwu-xKAy-vh8MAfiLD",
      title: "Todo 3",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores assumenda reprehenderit voluptatum.",
      parentId: "n4kfA1mTlozkS1ZJgXh2F",
      level: "low",
      createdAt: "13/02/2023",
      dueDate: "22/12/2023",
    },
    a6Gd5CzR5OrJiHXQWcqzg: {
      id: "a6Gd5CzR5OrJiHXQWcqzg",
      title: "Todo 4",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores assumenda reprehenderit voluptatum.",
      parentId: "vEkbg08U3xIOQuDm6x050",
      level: "medium",
      createdAt: "13/04/2023",
      dueDate: "12/12/2023",
    },
  },
};
