import { EntityState } from "@reduxjs/toolkit";
import { RootCategoryType } from "../featureTypes";

export const initialCategoryData: EntityState<RootCategoryType> = {
  ids: [
    "n4kfA1mTlozkS1ZJgXh2F",
    "1WltZRVXg9g58xezsZDoe",
    "fKE-LveMsiLFGoj4_XbQb",
    "hlNCw8ki8zY2_vixR0LjP",
  ],
  entities: {
    n4kfA1mTlozkS1ZJgXh2F: {
      id: "n4kfA1mTlozkS1ZJgXh2F",
      name: "Personal",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores assumenda reprehenderit voluptatum.",
      subCategories: [
        "vEkbg08U3xIOQuDm6x050",
        "PFpLILifYjc1eB7-wt8TL",
        "MfcckZJwyd94Z0QBqNYzp",
      ],
      todoList: [
        "m-nGn5t9_wLwS62YQhk0h",
        "aOOuRi5HhqqfVDlzSv6rb",
        "F5tiwu-xKAy-vh8MAfiLD",
      ],
      createdAt: "12/03/2021",
    },
    "1WltZRVXg9g58xezsZDoe": {
      id: "1WltZRVXg9g58xezsZDoe",
      name: "School",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores assumenda reprehenderit voluptatum.",
      createdAt: "12/03/2020",
      todoList: ["a6_d5CzR5OrJiHe233qzg"],
    },
    "fKE-LveMsiLFGoj4_XbQb": {
      id: "fKE-LveMsiLFGoj4_XbQb",
      name: "Business",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores assumenda reprehenderit voluptatum.",
      createdAt: "12/03/2020",
    },
    hlNCw8ki8zY2_vixR0LjP: {
      id: "hlNCw8ki8zY2_vixR0LjP",
      name: "Dentist",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores assumenda reprehenderit voluptatum.",
      createdAt: "12/03/2020",
    },
  },
};
