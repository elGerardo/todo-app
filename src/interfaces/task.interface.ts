export interface Task {
  title: string;
  user_id: number | null;
  type: string;
  description: string;
  items: [TaskItem] | null;
}

export interface TaskItem {
    title:string,
    text:string
}
