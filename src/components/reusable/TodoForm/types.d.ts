import { TodoType } from "../TodoItem/types";

type CreateTodoFormType = {
  type: "create";
  parentId: string;
};

type UpdateTodoFormType = {
  type: "update";
  parentId: string;
  todo: TodoType;
};

export type TodoFormPropsType = CreateTodoFormType | UpdateTodoFormType;
