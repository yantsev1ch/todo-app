import React, { ChangeEvent, FC, useState } from 'react';

import { CustomSpanView } from 'components/CustomSpan/CustomSpanView';

export interface ICustomSpan {
  value: string;
  onChange: (title: string) => void;
  executor: string;
}

export const CustomSpan: FC<ICustomSpan> = ({ value, onChange, executor }) => {
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

  return (
    <CustomSpanView
      value={value}
      executor={executor}
      changeTitle={changeTitle}
      title={title}
      activateViewMode={activateViewMode}
      activateEditMode={activateEditMode}
      editMode={editMode}
      onChange={onChange}
    />
  );
};