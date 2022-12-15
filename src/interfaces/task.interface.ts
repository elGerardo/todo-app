export interface Task {
  title: string;
  user_id: number;
  type: string;
  description: string;
  items: [TaskItem] | null;
}

export interface TaskItem {
    title:string,
    description:string
}
