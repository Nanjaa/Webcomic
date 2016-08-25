import React from 'react';
import About from './About';

export const path = '/about';
export const action = async (state) => {
	const title = 'About';
	state.context.onSetTitle(title);
	return <About title={title}/>
};