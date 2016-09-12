import React from 'react';
import Page from './page';

export const path = '/page';
export const action = async (state) => {
	const title = 'Page';
	state.context.onSetTitle(title);
	return <Page title={title}/>
};