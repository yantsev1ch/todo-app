export type FilterValuesType = 'waiting' | 'active' | 'completed';
export type btnColorType =
  | 'secondary'
  | 'success'
  | 'inherit'
  | 'warning'
  | 'error'
  | 'primary'
  | 'info';

export type TaskType = {
  id: string;
  title: string;
  executor: string;
  status: TaskStatuses;
};

export enum TaskStatuses {
  Waiting = 0,
  Active = 1,
  Completed = 2,
}

export type UpdateTaskModelType = {
  title?: string;
  executor?: string;
  status?: TaskStatuses;
};
