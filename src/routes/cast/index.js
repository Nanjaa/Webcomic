import React from 'react';
import Cast from './Cast';

export const path = '/cast';
export const action = async (state) => {
	const title = 'Cast of Characters';
	state.context.onSetTitle(title);
	return <Cast title={title}/>
};