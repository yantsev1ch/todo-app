import { makeAutoObservable } from 'mobx';

import { ITasks, UpdateDomainTaskModelType } from 'store/todo/ITasks';
import { FilterValuesType, ITodo } from 'store/todo/ITodo';

class TodoStore implements ITodo {
  filter: FilterValuesType = 'waiting';

  tasks: Array<ITasks> = [];

  constructor() {
    makeAutoObservable(this);
  }

  changeFilter(filter: FilterValuesType): void {
    this.filter = filter;
  }

  addTask(task: ITasks): void {
    this.tasks.push(task);
  }

  removeTask(id: string): void {
    this.tasks.filter(t => t.id !== id);
  }

  updateTask(id: string, model: UpdateDomainTaskModelType): void {
    this.tasks.map(t => (t.id === id ? model : t));
  }
}

export default new TodoStore();
