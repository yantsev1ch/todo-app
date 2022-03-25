import React, { FC, memo, ReactElement, useCallback } from 'react';

import { Button, Grid, Paper } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';

import AddTaskModal from 'components/AddTaskModal';
import Task from 'pages/Task';
import auth from 'store/auth/authStore';
import { ITasks } from 'store/todo/ITasks';
import { FilterValuesType } from 'store/todo/ITodo';
import todo from 'store/todo/todoStore';

const Todolist: FC = memo(
  observer(() => {
    const addTask = useCallback(
      (task: ITasks) => {
        todo.addTask(task);
      },
      [todo.addTask],
    );

    const onFilterButtonClickHandler = useCallback(
      (filter: FilterValuesType) => todo.changeFilter(filter),
      [],
    );

    const renderFilterButton = (
      buttonFilter: FilterValuesType,
      color:
        | 'secondary'
        | 'success'
        | 'inherit'
        | 'warning'
        | 'error'
        | 'primary'
        | 'info',
      text: string,
    ): ReactElement => (
      <Button
        variant={todo.filter === buttonFilter ? 'contained' : 'outlined'}
        onClick={() => onFilterButtonClickHandler(buttonFilter)}
        color={color}
      >
        {text}
      </Button>
    );

    if (!auth.isAuth) {
      return <Navigate to="/login" />;
    }

    return (
      <Grid className="todolist-container">
        <Paper className="todolist-content">
          <AddTaskModal addTask={addTask} />
          <div>
            {todo.tasks.map(t => (
              <Task key={t.id} task={t} />
            ))}
            {!todo.tasks.length && (
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
