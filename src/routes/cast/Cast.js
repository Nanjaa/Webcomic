import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './cast.scss';
import CastTable from '../../components/CastTable';

function Cast({ title }) {
	return(
		<div className={s.root}>
			<div className={s.wrapper}>
				<h2>{title}</h2>
				<CastTable/>
			</div>
		</div>
	);
}

Cast.propTypes = { title: PropTypes.string.isRequired };

export default withStyles(Cast, s);