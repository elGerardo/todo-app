export interface Task {
  title: string;
  type: "Note" | "List";
  description: string;
  items: [TaskItem] | null;
}

export interface TaskItem {
  title: string;
  text: string;
}
