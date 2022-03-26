import React, { ChangeEvent, FC, memo, ReactElement, useCallback, useState } from 'react';

import { Button, Grid, Input, Paper } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { v1 } from 'uuid';

import { useStores } from 'hooks/useStores';
import { btnColorType, FilterValuesType, TaskStatuses, TaskType } from 'models/TodoModel';
import Task from 'pages/Task';

const Todolist: FC = memo(
  observer(() => {
    const { todoStore } = useStores();
    const [value, setValue] = useState('');

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
      setValue(event.currentTarget.value);
    };

    const addNewTask = (): void => {
      const newTask: TaskType = {
        id: v1(),
        title: value,
        executor: '',
        status: TaskStatuses.Waiting,
      };
      todoStore.addTask(newTask);
      setValue('');
    };

    const onFilterButtonClickHandler = useCallback(
      (filter: FilterValuesType) => todoStore.changeFilter(filter),
      [],
    );

    const renderFilterButton = (
      buttonFilter: FilterValuesType,
      color: btnColorType,
      text: string,
    ): ReactElement => (
      <Button
        variant={todoStore.filter === buttonFilter ? 'contained' : 'outlined'}
        onClick={() => onFilterButtonClickHandler(buttonFilter)}
        color={color}
      >
        {text}
      </Button>
    );

    return (
      <Grid className="todolist-container">
        <Paper className="todolist-content">
          <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
            <Input value={value} onChange={onChangeHandler} />
            <Button color="warning" style={{ marginLeft: 10 }} onClick={addNewTask}>
              Add task
            </Button>
          </div>
          <div>
            {todoStore.tasks.map(t => (
              <Task key={t.id} task={t} />
            ))}
            {!todoStore.tasks.length && (
              <div style={{ padding: '10px', color: 'grey' }}>No task</div>
            )}
          </div>
          <div className="todolist-btn">
            {renderFilterButton('waiting', 'secondary', 'Waiting')}
            {renderFilterButton('active', 'primary', 'Active')}
            {renderFilterButton('completed', 'success', 'Completed')}
          </div>
        </Paper>
      </Grid>
    );
  }),
);

export default Todolist;
