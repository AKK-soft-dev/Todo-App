export type TodoLevelType = "low" | "medium" | "high";

export type TodoType = {
  id: string;
  title: string;
  description: string;
  parentId: string;
  createdAt: string;
  dueDate: string;
  done: boolean;
  doneAt?: string;
  level: TodoLevelType;
};

export type SubCategoryType = {
  id: string;
  name: string;
  description?: string;
  todoList?: string[];
  subCategories?: string[];
  createdAt: string;
  parentId: string;
};

export type RootCategoryType = Omit<SubCategoryType, "parentId">;

export type CategoryType = RootCategoryType & { parentId?: string };
