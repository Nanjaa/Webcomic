import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './cast.scss';

function Cast({ title }) {
	return(
		<div className={s.root}>
			<div className={s.container}>
				<h2>{title}</h2>
			</div>
		</div>
	);
}

Cast.propTypes = { title: PropTypes.string.isRequired };

export default withStyles(Cast, s);