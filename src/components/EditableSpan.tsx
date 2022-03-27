import React, { ChangeEvent, FC, useState } from 'react';

import { Input } from '@mui/material';

interface IEditSpan {
  value: string;
  onChange: (title: string) => void;
  executor: string;
}

export const EditableSpan: FC<IEditSpan> = ({ value, onChange, executor }) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(value);

  const activateEditMode = (): void => {
    setEditMode(true);
    setTitle(value);
  };
  const activateViewMode = (): void => {
    setEditMode(false);
    onChange(title);
  };
  const changeTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <Input value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
  ) : (
    <span onDoubleClick={activateEditMode}>
      {value}: {executor}
    </span>
  );
};
