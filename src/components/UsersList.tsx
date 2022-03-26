import * as React from 'react';
import { FC, ReactElement } from 'react';

import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { observer } from 'mobx-react-lite';

import { useStores } from 'hooks/useStores';

type PropsType = {
  onClose: (value: string) => void;
  open: boolean;
  selectedValue: string;
};

const SimpleDialog: FC<PropsType> = observer((props: any): ReactElement => {
  const { onClose, selectedValue, open } = props;
  const { authStore } = useStores();

  const handleClose = (): void => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: any): void => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <List sx={{ pt: 0 }}>
        {authStore.users.map(user => (
          <ListItem button onClick={() => handleListItemClick(user.name)} key={user.id}>
            <ListItemText primary={user.name} />
          </ListItem>
        ))}

        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List>
    </Dialog>
  );
});

const UsersList = (): ReactElement => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (value: any): void => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div style={{ display: 'inline' }}>
      <IconButton onClick={handleClickOpen}>
        <SettingsIcon fontSize="small" />
      </IconButton>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
};

export default UsersList;
