import { ITasks } from 'store/todo/ITasks';

export interface ITodo {
  filter: FilterValuesType;
  tasks: Array<ITasks>;
}

export type FilterValuesType = 'waiting' | 'active' | 'completed';
