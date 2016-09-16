import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ComicDisplay.scss';
import ComicNavigation from '../ComicNavigation';
import Firebase from 'firebase';
import ArchivesTable from '../ArchivesTable';
import Link from '../Link';

class ComicDisplay extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentPg: '',
			latestPg: '',
			arc: '',
			date: '',
			img: '',
			pg: ''
		}

		this.componentWillMount = this.componentWillMount.bind(this);
		this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.previousPage = this.previousPage.bind(this);
		this.nextPage = this.nextPage.bind(this);
		this.lastPage = this.lastPage.bind(this);
		this.updatePage = this.updatePage.bind(this);
		this.checkIfPage = this.checkIfPage.bind(this);
	}

	// Navigation functions
	previousPage() {
		if(this.props.pageNumber) {
			var previousPageNumber = '/page/' + (parseInt(this.props.pageNumber) -1);
			return previousPageNumber;
		}
		else {
			var previousPageNumber = '/page/' + (this.state.currentPg -1);
			return previousPageNumber;
		}
	}
	nextPage() {
		if(this.props.pageNumber) {
			var nextPageNumber = '/page/' + (parseInt(this.props.pageNumber) +1);
			return nextPageNumber;
		}
		else {
			var nextPageNumber = '/page/' + (this.state.currentPg +1);
			return nextPageNumber;
		}
	}
	lastPage() {
		var lastPageNumber = '/page/' + (this.state.latestPg);
		return lastPageNumber;
	}
	// Check if there is a designated page number to load. Otherwise, default to the most recent page.
	checkIfPage() {
		if(this.props.pageNumber) {
			this.setState({
				currentPg: this.props.pageNumber
			})
		}
		else {
			this.setState({
				currentPg: 0
			})
		}
	}

	// Update the display with the new page
	updatePage() {
		var ref = Firebase.database().ref("Comics/");
		ref.once("value")
			.then(function(snapshot) {

				this.checkIfPage();

				// Set up variables to be used in this function
				var comics = snapshot.val(),
					latest = comics[comics.length-1],
					latestNumber = comics.length-1;
				this.setState({
					latestPg: latestNumber
				})

				// Check if the most recent page shoud display
				if(this.state.currentPg == 0) {
					var currentComic = latest;
					this.setState({
						currentPg: latestNumber
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
		this.updatePage();
	}

	// State updates after that
	componentWillReceiveProps() {
		this.updatePage();
	}

	// Watch for keypress
	componentDidMount() {
		document.addEventListener("keydown", function(e) {
			// Left arrow
			if(e.keyCode == 37) {
				var prevUrl = this.previousPage();
				console.log(prevUrl);
				location.href = prevUrl;
			}
			// Right arrow
			else if(e.keyCode == 39) {
				var nextUrl = this.nextPage();
				console.log(nextUrl);
				location.href = nextUrl;
			}
		}.bind(this));
	}

	// Deactivate links
	isInactive(req) {
		// Check if you are on the first or last page
		if(req == 'first' && this.state.currentPg == 1) {
			return s.inactive;
		}
		else if(req == 'last' && this.state.currentPg == this.state.latestPg) {
			return s.inactive;
		}
	}

	render(props) {
		return(
			<div className={s.root}>
				<div className={s.container}>
					<h2>{this.props.pageNumber}</h2>
					<p>#{this.state.currentPg}</p>
					<p>Arc {this.state.arc}, Page {this.state.pg}</p>
					<p>{this.state.date}</p>
					<p>{this.state.img}</p>
				</div>

			    <div className={s.container}>
			    	<Link className={this.isInactive('first')} to="/page/1">First</Link>
			    	
			    	<Link className={this.isInactive('first')} to={this.previousPage()}>Previous</Link>

			    	<Link className={this.isInactive('last')} to={this.nextPage()}>Next</Link>

			    	<Link className={this.isInactive('last')} to={this.lastPage()}>Last</Link>
			    </div>

			    <div className={s.container}>
			        <a href="#">Expand Archives List</a>
			        <ArchivesTable/>
			    </div>
			</div>
		)		
	}

}

export default withStyles(ComicDisplay, s);