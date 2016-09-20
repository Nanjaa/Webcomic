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
			arcStarts: [],
			count: 0
		}
		this.pageLink = this.pageLink.bind(this);
		this.allArcs = this.allArcs.bind(this);
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
				var arcs = snapshot.val(),
					arcStarts = [];
				
				for(var i=1;i<arcs.length;i++) {
					arcStarts.push(arcs[i].StartPage);
				}
				this.setState({
					arcs: arcs,
					arcStarts:arcStarts
				})

			}.bind(this))
	}

	pageLink(number) {
		var pageNumber = '/page/' + number;
		return pageNumber;
	}

	allArcs(pageNumber) {
		for(var i=0; i<this.state.arcStarts.length; i++) {
			if(pageNumber == this.state.arcStarts[i]) {
				return <div className={s.arcTitle}><h3>{this.state.arcs[i+1].Title}</h3></div>
			}
		}
	}

	render() {
		return(
			<div className={s.root}>
				<div className={s.container}>
					<ul>
						{this.state.pages.map((page) => {
							return <div key={page.Page}>{this.allArcs(page.Page)}<li><Link to={this.pageLink(page.Page)}>[ {page.Page} ]</Link></li></div>;
						})}
						
					</ul>
				</div>
			</div>
		)
	}
}

export default withStyles(ArchivesTable, s);
