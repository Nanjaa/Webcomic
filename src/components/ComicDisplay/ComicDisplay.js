import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ComicDisplay.scss';
import ComicNavigation from '../ComicNavigation';
import Firebase from 'firebase';

class ComicDisplay extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		Firebase.database().ref('test/').set({
			hello: 2
		});
	}

	render() {
		return(
			<div className={s.root}>
				<div className={s.container}>
					<p>Hello there</p>
					<ComicNavigation/>
				</div>
			</div>
		)		
	}

}

export default withStyles(ComicDisplay, s);