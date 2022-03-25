export interface ITasks {
  id: string;
  title: string;
  executor: string;
  status: TaskStatuses;
}

export enum TaskStatuses {
  Waiting = 0,
  Active = 1,
  Completed = 2,
}

export type UpdateDomainTaskModelType = {
  title?: string;
  executor?: string;
  status?: TaskStatuses;
};
