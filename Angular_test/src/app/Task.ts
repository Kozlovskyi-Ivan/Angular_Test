// export interface Task {
//     id?: number;
//     text: string;
//     day: string;
//     reminder: boolean;
//   }
export interface Task {
  id?: number;
  name: string;
  comments: string;
  reminder: boolean;
  taskTypeId: number;
}

export interface TaskType {
  id: number;
  type: string;
}