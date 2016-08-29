import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Upload.scss';
import Firebase from 'firebase';

class Upload extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		// Firebase.database().ref('Comics/').push({
		// 	Arc: 1,
		// 	Date: "08-30-2016",
		// 	Image: "hello3.png",
		// 	Page: 3
		// });
	}

	render() {
		return(
			<div className={s.root}>
				<div className={s.container}>
					<h2>Upload</h2>
				</div>
			</div>
		);		
	}
}

export default withStyles(Upload, s);