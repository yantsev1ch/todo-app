import React, { ChangeEvent, useState } from 'react';

import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
  value: string;
  onChange: (title: string) => void;
};

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(props.value);

  const activateEditMode = (): void => {
    setEditMode(true);
    setTitle(props.value);
  };
  const activateViewMode = (): void => {
    setEditMode(false);
    props.onChange(title);
  };
  const changeTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.value}</span>
  );
});
