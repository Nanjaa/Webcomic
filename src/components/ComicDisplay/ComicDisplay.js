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
			localStorage.setItem('hubrisPage', this.props.pageNumber);
		}
		else if(localStorage.getItem('hubrisPage')) {
			var storedPage = parseInt(localStorage.getItem('hubrisPage'));
			if(parseInt(this.state.latestPg -1) == storedPage) {
				this.setState({
					currentPg: this.state.latestPg
				})
				localStorage.setItem('hubrisPage', this.state.latestPg);
			}
			else {
				this.setState({
					currentPg: storedPage
				})
			}

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

				var comics = snapshot.val(),
					latest = comics[comics.length-1],
					latestNumber = comics.length-1;

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
					img: 'http://nanja.space/Hubris/' + thisImg,
					pg: thisPg
				});
			}.bind(this))
	}

	// Initial state update
	componentWillMount() {
		var ref = Firebase.database().ref("Comics/");
		ref.once("value")
			.then(function(snapshot) {
				// Set up variables to be used in this function
				var comics = snapshot.val(),
					latest = comics[comics.length-1],
					latestNumber = comics.length-1;
				this.setState({
					latestPg: latestNumber
				})
				// Update the page with the current set of values
				this.updatePage();
			}.bind(this))
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
				// Make sure you're not on page 1
				if(parseInt(this.state.currentPg) !== 1) {
					var prevUrl = this.previousPage();
					location.href = prevUrl;
				}
			}
			// Right arrow
			else if(e.keyCode == 39) {
				// Make sure you're not on the latest page
				if(parseInt(this.state.currentPg) !== parseInt(this.state.latestPg)) {
					var nextUrl = this.nextPage();
					location.href = nextUrl;
				}
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
					<img src={this.state.img}/>
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