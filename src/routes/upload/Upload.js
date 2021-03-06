import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Upload.scss';
import UploadComic from '../../components/uploadcomic';

class Upload extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className={s.root}>
				<div className={s.wrapper}>
					<h2>Upload</h2>
					<UploadComic/>
				</div>
			</div>
		);		
	}
}

export default withStyles(Upload, s);