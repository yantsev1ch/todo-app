import { makeAutoObservable } from 'mobx';

import { FilterValuesType, TaskType, UpdateTaskModelType } from 'types/TodoTypes';

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
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  removeTask(id: string): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  updateTask(id: string, model: UpdateTaskModelType): void {
    const { tasks } = this;
    const index = tasks.findIndex(t => t.id === id);
    tasks[index] = { ...tasks[index], ...model };
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  getTasks(): void {
    const tasksJson = localStorage.getItem('tasks');
    this.tasks = tasksJson !== null ? JSON.parse(tasksJson) : [];
  }
}

export default new TodoStore();
