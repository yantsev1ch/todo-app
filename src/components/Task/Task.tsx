import React, { ChangeEvent, FC, useCallback } from 'react';

import { observer } from 'mobx-react-lite';

import { TaskView } from 'components/Task/Task.view';
import { useStores } from 'hooks/useStores';
import { TaskType } from 'types/TodoTypes';

export interface ITask {
  task: TaskType;
}

export const Task: FC<ITask> = React.memo(
  observer(({ task }) => {
    const { todoStore } = useStores();

    const onChangeStatusHandle = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? 'completed' : 'waiting';
        todoStore.updateTask(task.id, { status });
      },
      [task.id],
    );

    const onChangeTitleHandle = useCallback(
      (title: string) => {
        todoStore.updateTask(task.id, { title });
      },
      [task.id],
    );

    const onChangeExecutorHandle = useCallback(
      (executor: string) => {
        todoStore.updateTask(task.id, { executor, status: 'active' });
      },
      [task.id],
    );

    const onRemoveTaskHandler = useCallback(
      () => todoStore.removeTask(task.id),
      [task.id],
    );
    return (
      <TaskView
        filter={todoStore.filter}
        onChangeExecutor={onChangeExecutorHandle}
        onChangeStatus={onChangeStatusHandle}
        onChangeTitle={onChangeTitleHandle}
        onRemoveTask={onRemoveTaskHandler}
        task={task}
      />
    );
  }),
);
