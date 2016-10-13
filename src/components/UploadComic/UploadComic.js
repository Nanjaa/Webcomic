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
	}

	signIn() {
		var username = this.refs.username,
			usernameVal = username.value,
			password = this.refs.password,
			passwordVal = password.value;

		firebase.auth().signInWithEmailAndPassword(usernameVal, passwordVal).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorMessage);
		}.bind(this));
	}

	render() {
		return(
			<div className={s.root}>
				<div className={s.container}>
					<h2>Upload New Comic</h2>
					<input ref="username" type="text"/>
					<input ref="password" type="text"/>
					<a href="#" onClick={this.signIn}>Click Here</a>
					<h3>{this.state.error}</h3>
				</div>
			</div>
		)
	}
}

export default withStyles(UploadComic, s);