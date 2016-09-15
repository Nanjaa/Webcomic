import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ArchivesTable.scss';
import Firebase from 'firebase';
import Link from '../Link';

class ArchivesTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pages: []
		}
		this.pageLink = this.pageLink.bind(this);
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
	}

	pageLink(number) {
		var pageNumber = '/page/' + number;
		return pageNumber;
	}

	render() {
		return(
			<div className={s.root}>
				<div className={s.container}>
					<h2>This is where the archive list goes.</h2>
					<ul>
						{this.state.pages.map((page) => {
							return <li key={page.Page}><Link to={this.pageLink(page.Page)}>[ {page.Page} ]</Link></li>;
						})}
					</ul>
				</div>
			</div>
		)
	}
}

export default withStyles(ArchivesTable, s);
