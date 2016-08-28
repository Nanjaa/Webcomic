import React from 'react';
import Upload from './upload';

export const path = '/upload';
export const action = async (state) => {
	const title = 'Upload Comic';
	state.context.onSetTitle(title);
	return <Upload title={title}/>;
}