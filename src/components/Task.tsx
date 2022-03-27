import React, { ChangeEvent, FC, useCallback } from 'react';

import { Delete } from '@mui/icons-material';
import { Checkbox, IconButton } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { EditableSpan } from 'components/EditableSpan';
import { UsersList } from 'components/UsersList';
import { useStores } from 'hooks/useStores';
import { TaskType } from 'models/TodoTypes';

interface ITask {
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
        if (executor) {
          todoStore.updateTask(task.id, { executor, status: 'active' });
        }
      },
      [task.id],
    );

    const onRemoveTaskHandler = useCallback(
      () => todoStore.removeTask(task.id),
      [task.id],
    );
    return (
      <div key={task.id} className="task-container">
        {todoStore.filter === 'waiting' ? (
          <UsersList onChangeExecutor={onChangeExecutorHandle} />
        ) : (
          <Checkbox
            checked={task.status === 'completed'}
            color="primary"
            onChange={onChangeStatusHandle}
          />
        )}
        <EditableSpan
          value={task.title}
          onChange={onChangeTitleHandle}
          executor={task.executor}
        />
        <IconButton onClick={onRemoveTaskHandler} className="task-button" size="small">
          <Delete fontSize="small" />
        </IconButton>
      </div>
    );
  }),
);
