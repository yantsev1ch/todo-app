import React, { FC } from 'react';

import styled from '@emotion/styled';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton, ListItem, ListItemText } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import { UsersType } from 'types/UsersType';

interface ITaskModalView {
  open: boolean;
  users: Array<UsersType>;
  handleOpen: () => void;
  setExecutor: (executor: string) => void;
}

export const TaskModalView: FC<ITaskModalView> = ({
  open,
  users,
  handleOpen,
  setExecutor,
}) => {
  const Container = styled('div')`
    display: inline;
  `;
  return (
    <Container>
      <IconButton onClick={handleOpen}>
        <SettingsIcon fontSize="small" />
      </IconButton>
      <Modal open={open} onClose={setExecutor}>
        <Box className="userlist-box">
          <Typography variant="h6" component="h1" align="center">
            Select the task executor
          </Typography>
          {users.map(user => (
            <ListItem button onClick={() => setExecutor(user.name)} key={user.id}>
              <ListItemText primary={user.name} />
            </ListItem>
          ))}
        </Box>
      </Modal>
    </Container>
  );
};
