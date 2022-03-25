import * as React from 'react';
import { ChangeEvent, FC, useState } from 'react';

import { Input } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { v1 } from 'uuid';

import { ITasks, TaskStatuses } from 'store/todo/ITasks';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'lightgray',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

type PropsType = {
  addTask: (task: ITasks) => void;
};

const AddTaskModal: FC<PropsType> = ({ addTask }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const handleOpen = (): void => {
    setOpen(true);
  };

  const onChangeHandle = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.currentTarget.value);
  };

  const addNewTask = (): void => {
    const newTask = {
      id: v1(),
      title: value,
      executor: 'Andrey',
      status: TaskStatuses.Waiting,
    };
    addTask(newTask);
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">
        Add task
      </Button>
      <Modal
        open={open}
        onClose={onChangeHandle}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }}>
          <h2 id="parent-modal-title" style={{ textAlign: 'center' }}>
            Enter the name of the task
          </h2>
          <div>
            <Input onChange={onChangeHandle} />
            <Button
              onClick={addNewTask}
              variant="contained"
              style={{ marginLeft: 15 }}
              color="primary"
            >
              Ok
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AddTaskModal;
