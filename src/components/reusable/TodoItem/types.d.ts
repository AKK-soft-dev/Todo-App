export type TodoLevelType = "low" | "medium" | "high";

export type TodoType = {
  id: string | number;
  title: string;
  description: string;
  level: TodoLevel;
  createdAt: string;
  dueDate: string;
};
