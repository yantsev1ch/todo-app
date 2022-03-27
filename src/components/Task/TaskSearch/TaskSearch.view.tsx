import React, { ChangeEvent, FC } from 'react';

import { Input } from '@mui/material';

interface ITaskSearch {
  search: string;
  setSearch: (value: string) => void;
  disabled: boolean;
}

export const TaskSearchView: FC<ITaskSearch> = ({ search, setSearch, disabled }) => (
  <div>
    <Input
      placeholder="Search"
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        setSearch(event.currentTarget.value)
      }
      value={search}
      disabled={disabled}
    />
  </div>
);
