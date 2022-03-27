import React, { ChangeEvent, FC, ReactElement } from 'react';

import { Button, Grid, Input, Paper } from '@mui/material';

import { Task } from 'components/Task/Task';
import { ITaskSearch, TaskSearchView } from 'components/Task/TaskSearch/TaskSearch.view';
import { BtnColorType, FilterValuesType, TaskType } from 'types/TodoTypes';

interface ITodolistView extends ITaskSearch {
  title: string;
  onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  addTask: () => void;
  filterTasks: (tasks: Array<TaskType>) => Array<TaskType>;
  allTasks: Array<TaskType>;
  filter: FilterValuesType;
  onFilterButtonClickHandler: (newFilter: FilterValuesType) => void;
}

export const TodolistView: FC<ITodolistView> = props => {
  const {
    search,
    setSearch,
    filterTasks,
    addTask,
    onChangeTitle,
    title,
    filter,
    allTasks,
    onFilterButtonClickHandler,
  } = props;

  const renderFilterButton = (
    buttonFilter: FilterValuesType,
    color: BtnColorType,
    text: string,
  ): ReactElement => (
    <Button
      variant={filter === buttonFilter ? 'contained' : 'outlined'}
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
            disabled={!allTasks.length}
          />
          <div>
            <Input value={title} placeholder="Enter task name" onChange={onChangeTitle} />
            <Button color="warning" sx={{ marginLeft: '10px' }} onClick={addTask}>
              Add task
            </Button>
          </div>
        </div>
        <div>
          {filterTasks(allTasks).map(task => (
            <Task key={task.id} task={task} />
          ))}
          {!filterTasks(allTasks).length && (
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
};
