import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Page.scss';

function Page({ title }) {
	return(
		<div className={s.root}>
			<div className={s.container}>
				<h2>It worked!</h2>
			</div>
		</div>
	);
}

Page.propTypes = { title: PropTypes.string.isRequired };

export default withStyles(Page, s);