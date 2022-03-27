import React, { ChangeEvent, FC, useState } from 'react';

import { observer } from 'mobx-react-lite';
import { v1 } from 'uuid';

import { TodolistView } from 'components/Todolist/Todolist.view';
import { useStores } from 'hooks/useStores';
import { FilterValuesType, TaskType } from 'types/TodoTypes';

export const Todolist: FC = React.memo(
  observer(() => {
    const { todoStore, authStore } = useStores();
    const [title, setTitle] = useState('');
    const [search, setSearch] = useState('');

    const onChangeTitleHandle = (event: ChangeEvent<HTMLInputElement>): void => {
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

    const onFilterButtonClickHandler = (filter: FilterValuesType): void => {
      todoStore.changeFilter(filter);
    };

    const filterTasks = (tasks: Array<TaskType>): Array<TaskType> =>
      tasks
        .filter(task => task.status === todoStore.filter)
        .filter(task => task.title.toLowerCase().includes(search.toLowerCase()));

    return (
      <TodolistView
        title={title}
        onChangeTitle={onChangeTitleHandle}
        addTask={addNewTask}
        filterTasks={filterTasks}
        allTasks={todoStore.tasks}
        search={search}
        setSearch={setSearch}
        disabled={!todoStore.tasks.length}
        filter={todoStore.filter}
        onFilterButtonClickHandler={onFilterButtonClickHandler}
      />
    );
  }),
);
