import { TodoType } from "../../../redux/features/featureTypes";

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
