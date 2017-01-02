import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Archives.scss';
import ArchivesTable from '../../components/ArchivesTable';


function Archives({ title }) {
  return (
    <div className={s.root}>
    	<div className={s.wrapper}>
		    <h2>{title}</h2>
		    <ArchivesTable/>
		</div>
    </div>
  );
}

Archives.propTypes = { title: PropTypes.string.isRequired };

export default withStyles(Archives, s);

