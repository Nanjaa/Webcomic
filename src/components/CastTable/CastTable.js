import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CastTable.scss';
import Firebase from 'firebase';
import Link from '../Link';

class CastTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			mainCharacters: [],
			secondaryCharacters: [],
			otherCharacters: []
		}
		this.pageLink = this.pageLink.bind(this);
		this.componentWillMount = this.componentWillMount.bind(this);
		this.characterCard = this.characterCard.bind(this);
	}

	componentWillMount() {
		var ref = Firebase.database().ref("Cast/");
		ref.once("value")
			.then(function(snapshot) {
				var cast = snapshot.val(),
					mainCharacters = [],
					secondaryCharacters = [],
					otherCharacters = [];

				for(var i=0; i<cast.length; i++) {
					if(cast[i].Importance === 1) {
						mainCharacters.push(cast[i]);
					}
					else if(cast[i].Importance === 2) {
						secondaryCharacters.push(cast[i]);
					}
					else {
						otherCharacters.push(cast[i]);
					}
				}

				this.setState({
					mainCharacters: mainCharacters,
					secondaryCharacters: secondaryCharacters,
					otherCharacters: otherCharacters
				});
			}.bind(this))
	}

	pageLink(number) {
		var pageNumber = '/page/' + number;
		return pageNumber;
	}

	characterCard(character) {
		var characterImg = 'http://nanja.space/Hubris/Cast/' + character.Img;
		return(
			<div className={s.characterCard}>
				<h4 className={s.mobileOnly}>{character.Name}</h4>
				<img src={characterImg}/>
				<div className={s.characterText}>
					<h4 className={s.mobileHidden}>{character.Name}</h4>
					<p>{character.Desc}</p>
					<Link to={this.pageLink(character.FirstPage)}>First Appearance: Page {character.FirstPage}</Link>
				</div>
			</div>
		)

	}



	render() {
		return(
			<div className={s.root}>
				<div className={s.container}>
					<h3>Main Characters</h3>
					{this.state.mainCharacters.map((character) => {
						return(
							<div className={s.charactersList} key={character.Name}>
								{this.characterCard(character)}
							</div>
						)
					})}

					<h3>Secondary Characters</h3>
					{this.state.secondaryCharacters.map((character) => {
						return(
							<div className={s.charactersList} key={character.Name}>
								{this.characterCard(character)}
							</div>
						)
					})}

					<h3>Other Characters</h3>
					{this.state.otherCharacters.map((character) => {
						return(
							<div className={s.charactersList} key={character.Name}>
								{this.characterCard(character)}
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}

export default withStyles(CastTable, s);