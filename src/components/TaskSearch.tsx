import React, { ChangeEvent, FC } from 'react';

import { Input } from '@mui/material';

interface ITaskFilter {
  search: string;
  setSearch: (value: string) => void;
  disabled: boolean;
}

export const TaskSearch: FC<ITaskFilter> = ({ search, setSearch, disabled }) => {
  const onSearchHandle = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.currentTarget.value);
  };

  return (
    <div>
      <Input
        placeholder="Search"
        onChange={onSearchHandle}
        value={search}
        disabled={disabled}
      />
    </div>
  );
};
