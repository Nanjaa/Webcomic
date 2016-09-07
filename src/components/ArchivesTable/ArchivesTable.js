import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ArchivesTable.scss';
import Firebase from 'firebase';

class ArchivesTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pages: []
		}
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

				console.log(this.state.pages);

			}.bind(this))
	}

	render() {
		return(
			<div className={s.root}>
				<div className={s.container}>
					<h2>This is where the archive list goes.</h2>
					<ul>
						{this.state.pages.map((page) => {
							return <li key={page.Page}><a href="#">[ {page.Page} ]</a></li>;
						})}
					</ul>
				</div>
			</div>
		)
	}
}

export default withStyles(ArchivesTable, s);
