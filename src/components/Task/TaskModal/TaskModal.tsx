import * as React from 'react';
import { FC, ReactElement, useState } from 'react';

import { observer } from 'mobx-react-lite';

import { TaskModalView } from 'components/Task/TaskModal/TaskModal.view';
import { useStores } from 'hooks/useStores';

interface ITaskModal {
  onChangeExecutor: (executor: string) => void;
}

export const TaskModal: FC<ITaskModal> = observer(
  ({ onChangeExecutor }): ReactElement => {
    const { authStore } = useStores();
    const [open, setOpen] = useState(false);

    const handleOpen = (): void => setOpen(true);

    const setExecutor = (value: string): void => {
      if (value.length) {
        onChangeExecutor(value);
      }
      setOpen(false);
    };

    return (
      <TaskModalView
        open={open}
        users={authStore.users}
        handleOpen={handleOpen}
        setExecutor={setExecutor}
      />
    );
  },
);
