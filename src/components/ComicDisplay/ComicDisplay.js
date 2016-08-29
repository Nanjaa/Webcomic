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
		var ref = Firebase.database().ref("Comics/");
		ref.once("value")
			.then(function(snapshot) {
				var test = snapshot.val();
				console.log(test);
			})
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