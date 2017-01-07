import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './about.scss';

function About({ title }) {
	return(
		<div className={s.root}>
			<div className={s.wrapper}>
				<h3>About Archaic Rebirth</h3>
				<p>Vala has a passion for all things ancient. Since she was young, she's been enthralled by artifacts and stories of the past. In her ship that she inherited from her father, Vala travels the universe and explores forgotten ruins, bringing back items that she either adds to her gallery or sells to the researchers of the planet Tellean.</p>
				<p>Our story begins as Vala has discovered the previously lost domain of an ancient "God of the Underworld." This expedition will prove life-changing, as she'll soon learn that there's more to the stories than just myth.</p>

				<h3>About the Author</h3>
				<p>My name is Stephanie Piper, and I'm happy to welcome you to my first comic! During the day, I am a web developer from Seattle. Every evening, you'll find me writing and drawing this series, while also learning the fundamentals of art and improving my skill. On the weekends, I love to go camping and fishing, and I have always enjoyed theatre.</p>
			</div>
		</div>
	);
}

About.propTypes = { title: PropTypes.string.isRequired };

export default withStyles(About, s);