import React, { ChangeEvent, FC, ReactElement, useState } from 'react';

import { Button, Grid, Input, Paper } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { v1 } from 'uuid';

import { Task } from 'components/Task/Task';
import { TaskSearchView } from 'components/Task/TaskSearch/TaskSearch.view';
import { useStores } from 'hooks/useStores';
import { btnColorType, FilterValuesType, TaskType } from 'models/TodoTypes';

export const Todolist: FC = React.memo(
  observer(() => {
    const { todoStore, authStore } = useStores();
    const [title, setTitle] = useState('');
    const [search, setSearch] = useState('');

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
      setTitle(event.currentTarget.value);
    };

    const addNewTask = (): void => {
      if (!title.trim().length) {
        authStore.setError('Enter valid task name');
        setTitle('');
        return;
      }
      const newTask: TaskType = {
        id: v1(),
        title,
        executor: '',
        status: 'waiting',
      };
      todoStore.addTask(newTask);
      setTitle('');
    };

    const onFilterButtonClickHandler = (filter: FilterValuesType): void =>
      todoStore.changeFilter(filter);

    const filterTasks = (tasks: Array<TaskType>): Array<TaskType> =>
      tasks
        .filter(task => task.status === todoStore.filter)
        .filter(task => task.title.toLowerCase().includes(search.toLowerCase()));

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
          <div className="todolist-inputs">
            <TaskSearchView
              search={search}
              setSearch={setSearch}
              disabled={!todoStore.tasks.length}
            />
            <div>
              <Input
                value={title}
                placeholder="Enter task name"
                onChange={onChangeHandler}
              />
              <Button color="warning" sx={{ marginLeft: '10px' }} onClick={addNewTask}>
                Add task
              </Button>
            </div>
          </div>
          <div>
            {filterTasks(todoStore.tasks).map(task => (
              <Task key={task.id} task={task} />
            ))}
            {!filterTasks(todoStore.tasks).length && (
              <div className="filter-task-error">No task</div>
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
