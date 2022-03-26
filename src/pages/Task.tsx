import React, { ChangeEvent, FC, useCallback } from 'react';

import { Delete } from '@mui/icons-material';
import { Checkbox, IconButton } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { EditableSpan } from 'components/EditableSpan';
import UsersList from 'components/UsersList';
import { useStores } from 'hooks/useStores';
import { TaskStatuses, TaskType } from 'models/TodoTypes';

type PropsType = {
  task: TaskType;
};

const Task: FC<PropsType> = React.memo(
  observer(({ task }) => {
    const { todoStore } = useStores();

    const onChangeStatusHandle = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = e.currentTarget.checked;
        const status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.Waiting;
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

    const onRemoveTaskHandler = useCallback(
      () => todoStore.removeTask(task.id),
      [task.id],
    );
    return (
      <div key={task.id} style={{ position: 'relative' }}>
        {todoStore.filter === 'waiting' ? (
          <UsersList />
        ) : (
          <Checkbox
            checked={task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeStatusHandle}
          />
        )}
        <EditableSpan value={task.title} onChange={onChangeTitleHandle} />
        <IconButton
          onClick={onRemoveTaskHandler}
          size="small"
          style={{ position: 'absolute', top: '2px', right: '2px' }}
        >
          <Delete fontSize="small" />
        </IconButton>
      </div>
    );
  }),
);

export default Task;
