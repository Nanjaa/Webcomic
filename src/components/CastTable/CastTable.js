import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CastTable.scss';
import Firebase from 'firebase';
import Link from '../Link';

class CastTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			cast: []
		}
		this.pageLink = this.pageLink.bind(this);
		this.componentWillMount = this.componentWillMount.bind(this);
	}

	componentWillMount() {
		var ref = Firebase.database().ref("Cast/");
		ref.once("value")
			.then(function(snapshot) {
				var cast = snapshot.val();

				this.setState({
					cast: cast
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
					<ul className={s.charactersList}>
						{this.state.cast.map((character) => {
							return (
								<ul key={character.Name}>
									<li><h4>{character.Name}</h4></li>
									<li>{character.Img}</li>
									<li>{character.Desc}</li>
									<li>First Appearance: {character.FirstPage}</li>
									<li>Importance: {character.Importance}</li>
								</ul>
							)
						})}
						
					</ul>
				</div>
			</div>
		)
	}
}

export default withStyles(CastTable, s);