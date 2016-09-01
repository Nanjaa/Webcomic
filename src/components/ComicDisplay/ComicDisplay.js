import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ComicDisplay.scss';
import ComicNavigation from '../ComicNavigation';
import Firebase from 'firebase';

class ComicDisplay extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentPg: 1,
			arc: '',
			date: '',
			img: '',
			pg: ''
		}

		this.componentWillMount = this.componentWillMount.bind(this);
		this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
		this.firstPage = this.firstPage.bind(this);
		this.previousPage = this.previousPage.bind(this);
		this.nextPage = this.nextPage.bind(this);
		this.lastPage = this.lastPage.bind(this);
		this.updatePage = this.updatePage.bind(this);
	}

	// Navigation functions
	firstPage() {
		this.setState({
			currentPg: 1
		})
	}
	previousPage() {
		this.setState({
			currentPg: this.state.currentPg - 1
		})
	}
	nextPage() {
		this.setState({
			currentPg: this.state.currentPg + 1
		})
	}
	lastPage() {
		this.setState({
			currentPg: 0
		})
	}

	// Update the display with the new page
	updatePage() {
		var ref = Firebase.database().ref("Comics/");
		ref.once("value")
			.then(function(snapshot) {
				// Set up variables to be used in this function
				var comics = snapshot.val(),
					latest = comics[comics.length-1];

				// Check if the most recent page shoud display
				if(this.state.currentPg == 0) {
					console.log('Hello??!!');
					var currentComic = latest;
					this.setState({
						currentPg: comics.length-1
					})
				}
				else {
					var currentComic = snapshot.child(this.state.currentPg).val()
				}
				
				var thisArc = currentComic.Arc,
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

	// Initial state update
	componentWillMount() {
		this.setState({
			currentPg: 0
		})
		this.updatePage();
	}

	// State ypdates after that
	componentWillReceiveProps() {
		this.updatePage();
	}

	render() {
		return(
			<div className={s.root}>
				<div className={s.container}>
					<p>#{this.state.currentPg}</p>
					<p>Arc {this.state.arc}, Page {this.state.pg}</p>
					<p>{this.state.date}</p>
					<p>{this.state.img}</p>
				</div>
				<div className={s.container}>
			        <a onClick={this.firstPage} href="#">Beginning</a>
			        <span className={s.spacer}>|</span>
			        <a onClick={this.previousPage} href="#">Previous</a>
			        <span className={s.spacer}>|</span>
			        <a onClick={this.nextPage} href="#">Next</a>
			        <span className={s.spacer}>|</span>
			        <a onClick={this.lastPage} href="#">End</a>
			    </div>

			    <div className={s.container}>
			        <a href="#">Expand Archives List</a>
			    </div>
			</div>
		)		
	}

}

export default withStyles(ComicDisplay, s);