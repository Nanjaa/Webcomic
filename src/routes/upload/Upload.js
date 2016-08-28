import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Upload.scss';

function Upload({ title }) {
	return(
		<div className={s.root}>
			<div className={s.container}>
				<h2>{title}</h2>
			</div>
		</div>
	)
}