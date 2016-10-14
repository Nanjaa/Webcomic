import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UploadComic.scss';
import Firebase from 'firebase';

class UploadComic extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			error: 'Please enter login info above'
		}

		this.signIn = this.signIn.bind(this);
		this.signOut = this.signOut.bind(this);
		this.uploadNew = this.uploadNew.bind(this);
	}

	signIn() {
		var username = this.refs.username,
			usernameVal = username.value,
			password = this.refs.password,
			passwordVal = password.value;

		Firebase.auth().signInWithEmailAndPassword(usernameVal, passwordVal).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			this.setState({
				error: errorMessage
			});
		}.bind(this));
	}

	signOut() {
		Firebase.auth().signOut().then(function() {
			this.setState({
				error: "Successfully signed out!"
			});
		}.bind(this), function(error) {
			this.setState({
				error: error
			})
		}.bind(this));
	}

	uploadNew() {
		var database = Firebase.database(),
			arc = this.refs.arc,
			date = this.refs.date,
			image = this.refs.image;
		//Firebase.database().ref('Comics/' + )
	}

	componentWillMount() {
		var ref = Firebase.database().ref("Comics/");
		ref.once("value")
			.then(function(snapshot) {
				console.log(snapshot);
			});
	}

	render() {
		return(
			<div className={s.root}>
				<div className={s.container}>
					<h2>Sign In</h2>
					<input ref="username" type="text"/>
					<input ref="password" type="text"/>
					<a href="#" onClick={this.signIn}>Click Here</a>
					<a href="#" onClick={this.signOut}>Sign Out</a>
					<h3>{this.state.error}</h3>

					<h2>Upload New Comic</h2>
					<h3>Arc</h3>
					<input ref="arc" type="text"/>
					<h3>Date</h3>
					<input ref="date" type="text"/>
					<h3>Image</h3>
					<input ref="image" type="text"/>
					<a href="#" onClick={this.uploadNew}>Click Here</a>
				</div>
			</div>
		)
	}
}

export default withStyles(UploadComic, s);