export type FilterValuesType = 'waiting' | 'active' | 'completed';
export type BtnColorType =
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
  status: FilterValuesType;
};

export type UpdateTaskModelType = {
  title?: string;
  executor?: string;
  status?: FilterValuesType;
};
