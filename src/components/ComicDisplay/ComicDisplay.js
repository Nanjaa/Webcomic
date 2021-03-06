import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ComicDisplay.scss';
import ComicNavigation from '../ComicNavigation';
import Firebase from 'firebase';
import ArchivesTable from '../ArchivesTable';
import Link from '../Link';
import Loading from './loading.gif';
import Location from '../../core/Location';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class ComicDisplay extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentPg: '',
			latestPg: '',
			arc: '',
			date: '',
			img: Loading,
			pg: '',
			loadingHidden: true,
			missingHidden: true,
			expanded: false
		}

		this.componentWillMount = this.componentWillMount.bind(this);
		this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.previousPage = this.previousPage.bind(this);
		this.nextPage = this.nextPage.bind(this);
		this.lastPage = this.lastPage.bind(this);
		this.updatePage = this.updatePage.bind(this);
		this.checkIfPage = this.checkIfPage.bind(this);
		this.hidden = this.hidden.bind(this);
		this.expand = this.expand.bind(this);
		this.expandClass = this.expandClass.bind(this);
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
		this.setState({
			loadingHidden: true
		})

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
		this.setState({
			img: Loading,
			missingHidden: true
		});

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
				
				if(currentComic !== null) {
					var thisArc = currentComic.Arc,
						thisDate = currentComic.Date,
						thisImg = currentComic.Image,
						thisPg = currentComic.Page;
	 
					this.setState({
						arc: thisArc,
						date: thisDate,
						img: 'http://nanja.space/Hubris/' + thisImg,
						pg: thisPg,
						loadingHidden: false
					});
				}
				else {
					this.setState({
						missingHidden: false,
						img: ''
					})
				}

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
		document.addEventListener("keyup", function(e) {
			// Left arrow
			if(e.keyCode == 37) {
				// Make sure you're not on page 1
				if(parseInt(this.state.currentPg) !== 1) {
					var prevUrl = this.previousPage();
					// this.props.history.push('/some/path');
					Location.push(prevUrl);
					console.log(prevUrl);
				}
			}
			// Right arrow
			else if(e.keyCode == 39) {
				// Make sure you're not on the latest page
				if(parseInt(this.state.currentPg) !== parseInt(this.state.latestPg)) {
					var nextUrl = this.nextPage();
					// this.props.history.push('/some/path');
					Location.push(nextUrl);
					console.log(nextUrl);
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

	hidden(element) {
		if(element === 'loading') {
			if(this.state.loadingHidden) {
				return s.hidden;
			}
		}
		else if(element === 'missing') {
			if(this.state.missingHidden) {
				return s.hidden;
			}
		}
	}

	expandClass() {
		if(this.state.expanded === true) {
			return s.expandedArchives;
		}
		else {
			return s.hiddenArchives;
		}
	}

	expand() {
		this.setState({
			expanded: !this.state.expanded
		})
	}

	render(props) {
		return(
			<div className={s.cDisplayRoot}>
				<div className={s.container}>
					<div className={s.prevNext}>
						<Link className={this.isInactive('first')} to="/page/1"><img className="grayscale" src={require('./first.png')} alt="Go to first page" /></Link>
						
						<Link className={this.isInactive('first')} to={this.previousPage()}><img className="grayscale" src={require('./prev.png')} alt="Go to previous page" /></Link>

						<Link className={this.isInactive('last')} to={this.nextPage()}><img className="grayscale" src={require('./next.png')} alt="Go to next page" /></Link>

						<Link className={this.isInactive('last')} to={this.lastPage()}><img className="grayscale" src={require('./last.png')} alt="Go to last page" /></Link>
					</div>
					
					<div className={this.hidden('loading')}>
						<p><span className={s.bold}>Page {this.state.currentPg}</span></p>
						<p>{this.state.date}</p>
					</div>
					<img src={this.state.img}/>
					<div className={this.hidden('missing')}>
						<h2>Empty Treasure Room!</h2>
						<p>We're sorry, but your URL currently leads nowhere. Looking for a page in particular? check out our <Link to="/archives">archives</Link>!</p>
					</div>
					<div className={s.prevNext}>
						<Link className={this.isInactive('first')} to="/page/1"><img className="grayscale" src={require('./first.png')} alt="Go to first page" /></Link>
						
						<Link ref={this.prevPg} className={this.isInactive('first')} to={this.previousPage()}><img className="grayscale" src={require('./prev.png')} alt="Go to previous page" /></Link>

						<Link ref="nextPg" className={this.isInactive('last')} to={this.nextPage()}><img className="grayscale" src={require('./next.png')} alt="Go to next page" /></Link>

						<Link className={this.isInactive('last')} to={this.lastPage()}><img className="grayscale" src={require('./last.png')} alt="Go to last page" /></Link>
					</div>

					<div className={s.expandArchives}>
						<p onClick={this.expand}>Expand Archives List</p>
						<div id={s.test} className={this.expandClass()}>
							<ArchivesTable/>
						</div>
					</div>
				</div>
			</div>
		)
	}

}

export default withStyles(ComicDisplay, s);