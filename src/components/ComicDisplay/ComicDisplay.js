import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ComicDisplay.scss';
import ComicNavigation from '../ComicNavigation';
import Firebase from 'firebase';

class ComicDisplay extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentPg: 2,
			arc: '',
			date: '',
			img: '',
			pg: ''
		}

		this.componentWillMount = this.componentWillMount.bind(this);
	}

	componentWillMount() {
		var ref = Firebase.database().ref("Comics/");
		ref.once("value")
			.then(function(snapshot) {
				var comics = snapshot.val(),
					latest = comics[comics.length-1],
					currentComic = snapshot.child(this.state.currentPg).val(),
					thisArc = currentComic.Arc,
					thisDate = currentComic.Date,
					thisImg = currentComic.Image,
					thisPg = currentComic.Page;

				this.setState({
					arc: thisArc,
					date: thisDate,
					img: thisImg,
					pg: thisPg
				});
			}.bind(this))
	}

	render() {
		return(
			<div className={s.root}>
				<div className={s.container}>
					<p>{this.state.arc}</p>
					<p>{this.state.date}</p>
					<p>{this.state.img}</p>
					<p>{this.state.pg}</p>
					<ComicNavigation/>
				</div>
			</div>
		)		
	}

}

export default withStyles(ComicDisplay, s);