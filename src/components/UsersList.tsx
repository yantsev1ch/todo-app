import * as React from 'react';
import { FC, ReactElement, useState } from 'react';

import styled from '@emotion/styled';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton, ListItem, ListItemText } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';

import { useStores } from 'hooks/useStores';

interface IUserList {
  onChangeExecutor: (executor: string) => void;
}

export const UsersList: FC<IUserList> = observer(({ onChangeExecutor }): ReactElement => {
  const { authStore } = useStores();
  const [open, setOpen] = useState(false);

  const handleOpen = (): void => setOpen(true);

  const setExecutor = (value: string): void => {
    if (value.length) {
      onChangeExecutor(value);
    }
    setOpen(false);
  };

  const Div = styled('div')`
    display: inline;
  `;

  return (
    <Div>
      <IconButton onClick={handleOpen}>
        <SettingsIcon fontSize="small" />
      </IconButton>
      <Modal open={open} onClose={setExecutor}>
        <Box className="userlist-box">
          <Typography variant="h6" component="h1" align="center">
            Select the task executor
          </Typography>
          {authStore.users.map(user => (
            <ListItem button onClick={() => setExecutor(user.name)} key={user.id}>
              <ListItemText primary={user.name} />
            </ListItem>
          ))}
        </Box>
      </Modal>
    </Div>
  );
});
