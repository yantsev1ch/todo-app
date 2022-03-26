import { makeAutoObservable } from 'mobx';

import { FilterValuesType, TaskType, UpdateTaskModelType } from 'models/TodoModel';

export interface ITodo {
  filter: FilterValuesType;
  tasks: Array<TaskType>;
}

class TodoStore implements ITodo {
  filter: FilterValuesType = 'waiting';

  tasks: Array<TaskType> = [];

  constructor() {
    makeAutoObservable(this);
  }

  changeFilter(filter: FilterValuesType): void {
    this.filter = filter;
  }

  addTask(task: TaskType): void {
    this.tasks.push(task);
  }

  removeTask(id: string): void {
    this.tasks.filter(t => t.id !== id);
  }

  updateTask(id: string, model: UpdateTaskModelType): void {
    this.tasks.map(t => (t.id === id ? model : t));
  }
}

export default new TodoStore();
