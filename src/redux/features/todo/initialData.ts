import { EntityState } from "@reduxjs/toolkit";
import { TodoType } from "../featureTypes";

export const initialTodoData: EntityState<TodoType> = {
  ids: [
    "m-nGn5t9_wLwS62YQhk0h",
    "aOOuRi5HhqqfVDlzSv6rb",
    "F5tiwu-xKAy-vh8MAfiLD",
    "a6Gd5CzR5OrJiHXQWcqzg",
    "a6_d5CzR5OrJiHe233qzg",
    "a67dA5CzR5OrJiHe233qzg",
  ],
  entities: {
    "m-nGn5t9_wLwS62YQhk0h": {
      id: "m-nGn5t9_wLwS62YQhk0h",
      title: "Todo 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores assumenda reprehenderit voluptatum.",
      parentId: "n4kfA1mTlozkS1ZJgXh2F",
      level: "high",
      createdAt: "03/15/2023",
      dueDate: "12/12/2023",
      done: true,
      doneAt: "2023-03-24T13:30:00.000Z",
    },
    aOOuRi5HhqqfVDlzSv6rb: {
      id: "aOOuRi5HhqqfVDlzSv6rb",
      title: "Todo 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores assumenda reprehenderit voluptatum.",
      parentId: "n4kfA1mTlozkS1ZJgXh2F",
      level: "high",
      createdAt: "03/15/2023",
      dueDate: "11/11/2023",
      done: true,
      doneAt: "2023-03-24T12:30:00.000Z",
    },
    "F5tiwu-xKAy-vh8MAfiLD": {
      id: "F5tiwu-xKAy-vh8MAfiLD",
      title: "Todo 3",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores assumenda reprehenderit voluptatum.",
      parentId: "n4kfA1mTlozkS1ZJgXh2F",
      level: "low",
      createdAt: "02/13/2023",
      dueDate: "09/20/2023",
      done: false,
    },
    a6Gd5CzR5OrJiHXQWcqzg: {
      id: "a6Gd5CzR5OrJiHXQWcqzg",
      title: "Todo 4",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores assumenda reprehenderit voluptatum.",
      parentId: "vEkbg08U3xIOQuDm6x050",
      level: "medium",
      createdAt: "04/23/2023",
      dueDate: "12/12/2023",
      done: true,
      doneAt: "2023-05-07T15:30:00.000Z",
    },
    a67dA5CzR5OrJiHe233qzg: {
      id: "a67dA5CzR5OrJiHe233qzg",
      title: "Todo 5",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores assumenda reprehenderit voluptatum.",
      parentId: "1WltZRVXg9g58xezsZDoe",
      level: "high",
      createdAt: "10/14/2023",
      dueDate: "04/29/2024",
      done: false,
    },
    a6_d5CzR5OrJiHe233qzg: {
      id: "a6_d5CzR5OrJiHe233qzg",
      title: "Todo 6",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores assumenda reprehenderit voluptatum.",
      parentId: "1WltZRVXg9g58xezsZDoe",
      level: "medium",
      createdAt: "10/13/2023",
      dueDate: "05/10/2024",
      done: false,
    },
  },
};
