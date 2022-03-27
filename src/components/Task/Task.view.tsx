import React, { ChangeEvent, FC } from 'react';

import { Delete } from '@mui/icons-material';
import { Checkbox, IconButton } from '@mui/material';

import { CustomSpan } from 'components/CustomSpan/CustomSpan';
import { ITask } from 'components/Task/Task';
import { TaskModal } from 'components/Task/TaskModal/TaskModal';
import { FilterValuesType } from 'models/TodoTypes';

interface ITaskView extends ITask {
  filter: FilterValuesType;
  onChangeExecutor: (executor: string) => void;
  onChangeStatus: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeTitle: (title: string) => void;
  onRemoveTask: () => void;
}

export const TaskView: FC<ITaskView> = props => {
  const { task, onRemoveTask, filter, onChangeStatus, onChangeTitle, onChangeExecutor } =
    props;
  return (
    <div key={task.id} className="task-container">
      {filter === 'waiting' ? (
        <TaskModal onChangeExecutor={onChangeExecutor} />
      ) : (
        <Checkbox
          checked={task.status === 'completed'}
          color="primary"
          onChange={onChangeStatus}
        />
      )}
      <CustomSpan value={task.title} onChange={onChangeTitle} executor={task.executor} />
      <IconButton onClick={onRemoveTask} className="task-button" size="small">
        <Delete fontSize="small" />
      </IconButton>
    </div>
  );
};
