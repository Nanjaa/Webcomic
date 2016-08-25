import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './about.scss';

function About({ title }) {
	return(
		<div className={s.root}>
			<div className={s.container}>
				<h2>{title}</h2>
			</div>
		</div>
	);
}

About.propTypes = { title: PropTypes.string.isRequired };

export default withStyles(About, s);