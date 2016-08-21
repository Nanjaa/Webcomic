import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './OauthPopup.scss';
var Ajax = require('react-ajax');

class OauthPopup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loggedIn: false,
			name: 'New User',
			token: 0,
			url: 'https://api.instagram.com/v1/users/self/?access_token='
		};

		this.logIn = this.logIn.bind(this);
		this.getInformation = this.getInformation.bind(this);
	}

	logIn() {
		const OAuth = require( '../../../node_modules/oauthio-web/dist/oauth.js' );
		OAuth.OAuth.initialize('No2d6YEh-siKpGj1Coq-yl8whNY');
		OAuth.OAuth.popup('instagram').then(function(instagram) {
			//make API calls with `instagram`
			console.log(instagram);
			this.setState({
				name: instagram.user.full_name,
				token: instagram.access_token,
				url: this.state.url + instagram.access_token
			});

			return instagram.get(this.state.url).done(function(data) {
				console.log('data retrieved');
			}).fail(function(err) {
				console.log(err);
			})

		}.bind(this)).then(function(data) {
			console.log(data);
		}).fail(function(err) {
			console.log('popup failed');
		});
	}

	getInformation() {
		console.log('hello');
	}

	render() {
		return(
			<div>
				<a className={s.oauthLogin} href="#" onClick={this.logIn}>Hello, {this.state.name}</a>
				<a className={s.oauthLogin} href="#" onClick={this.getInformation}>Get Info</a>
			</div>
		);
	}
}

export default withStyles(OauthPopup, s);