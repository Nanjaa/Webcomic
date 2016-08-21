import React from 'react';
import Archives from './archives';

export const path = '/archives';
export const action = async (state) => {
  const title = 'Comic Archives';
  state.context.onSetTitle(title);
  return <Archives title={title} />;
};