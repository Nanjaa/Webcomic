import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ArchivesTable.scss';
import Firebase from 'firebase';
import Link from '../Link';

class ArchivesTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pages: [],
			arcs: [],
			count: 0
		}
		this.pageLink = this.pageLink.bind(this);
		this.checkIfArcstart = this.checkIfArcstart.bind(this);
		this.componentWillMount = this.componentWillMount.bind(this);
	}

	componentWillMount() {
		var ref = Firebase.database().ref("Comics/");
		ref.once("value")
			.then(function(snapshot) {
				// Set up variables to be used in this function
				var comics = snapshot.val(),
					latest = comics[comics.length-1],
					latestNumber = comics.length-1;

				this.setState({
					pages: comics
				});
			}.bind(this))
		var ref2 = Firebase.database().ref("Arcs/");
		ref2.once("value")
			.then(function(snapshot) {
				// Set up variables to be used in this function
				var arcs = snapshot.val();
				this.setState({
					arcs: arcs
				})
			}.bind(this))
	}

	pageLink(number) {
		var pageNumber = '/page/' + number;
		return pageNumber;
	}

	checkIfArcstart(pageNumber) {
		for(var i=1; i<this.state.arcs.length; i++) {
			if(pageNumber === this.state.arcs[i].StartPage) {
				return <h3>{this.state.arcs[i].Title}</h3>
			}
		}
		return null;
	}



	render() {
		return(
			<ul>
				{this.state.pages.map((page) => {
					var arcTitle = this.checkIfArcstart(page.Page);
					if (arcTitle === null) {
						return <li key={page.Page}><Link to={this.pageLink(page.Page)}>[ {page.Page} ]</Link></li>
					}
					else {
						return ([
							<li key={page.Page} className={s.arcTitle}>{arcTitle}</li>,
							<li><Link to={this.pageLink(page.Page)}>[ {page.Page} ]</Link></li>
						]);
					}
				})}
				
			</ul>
		)
	}
}

export default withStyles(ArchivesTable, s);