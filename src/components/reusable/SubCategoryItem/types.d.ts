export interface CategoryType {
  id: string | number;
  name: string;
  description: string;
  createdAt: string;
  parentId?: string;
}
