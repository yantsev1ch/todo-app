import React, { ChangeEvent, FC } from 'react';

import { Input } from '@mui/material';

import { ICustomSpan } from 'components/CustomSpan/CustomSpan';

interface ICustomSpanView extends ICustomSpan {
  editMode: boolean;
  title: string;
  changeTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  activateViewMode: () => void;
  activateEditMode: () => void;
}

export const CustomSpanView: FC<ICustomSpanView> = props => {
  const {
    activateEditMode,
    activateViewMode,
    changeTitle,
    editMode,
    title,
    value,
    executor,
  } = props;
  return editMode ? (
    <Input value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
  ) : (
    <span onDoubleClick={activateEditMode}>
      {value}: {executor}
    </span>
  );
};
