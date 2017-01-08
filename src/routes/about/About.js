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

				<h3>About Me</h3>
				<p>My name is Stephanie Piper, and I'm happy to welcome you to my first comic! During the day, I am a web developer from Seattle. Every evening, you'll find me writing and drawing this series, while also learning the fundamentals of art and improving my skill. On the weekends, I love to go camping and fishing, and I have always enjoyed theatre.</p>

				<h3>My Favorite Comics</h3>
				<ol>
					<li><span className={s.bold}>Chew</span> - Recently completed, Chew is easily my favorite series. "Silly-Serious" is my favorite genre (that's what I call it, at least), and Chew is the perfect specimen of the mixed genre. There are moments that are absolutely heartbreaking and times where the story features some top-notch humor, and sometimes those moments are one in the same. The story revolves around an FDA (you heard me, FDA) agent named Tony Chu, who is able to see the memories of whatever he eats. If he eats a banana, he sees the tree that it came from and the moment it is plucked from said tree. If he eats a steak, he sees a vastly different story. Rob Guillory's art in Chew blends absolutely perfectly with John Layman's writing, and the pair create a story that is not to be forgotten anytime soon. I highly recommend this incredible series.</li>
					<li><span className={s.bold}>Berserk</span> - Now, to completely contrast my first choice, my second favorite series is Berserk, an extremely dark fantasy from the extraordinarily talented Kentaro Miura. This manga has some of my favorite comic art I've seen to date. The way that Miura inks his pages is nothing short of incredible, and the story that he takes us on for over 350 chapters is haunting, captivating, and exciting. However, I must mention that this series is absolutely NOT for the faint of heart, as it is extremely graphic. In Berserk, we follow Guts through his life, and cheer him on as he seeks ultimate revenge. What strikes me most about this series (besides Miura's art, which I could easily gush about all day) is the character development. This journey introduces us to many different characters, and each one is as fully fleshed out as the previous. We watch as characters grow and change before our eyes, and our perception of them changes along with it. Berserk is nothing short of a masterpiece, defining an era unlike any other (as the series began in 1989).</li>
					<li><span className={s.bold}>Sweet Tooth</span> - Here's the thing about Sweet Tooth: the less you know going in, the more of a journey it is. I went into the series not knowing <span className={s.italics}>anything</span>, and boy did it take me on a wild ride! Instead of describing this one, I will commend Jeff Lemire on his incredible work. Lemire's writing dances with his incredible artwork so perfectly throughout the story, resulting in a stunning work that leaves the reader hungry for more. I believe if there was one series that I could read again as if it were the first time, this would be it. I can't describe the journey that Lemire took me on as I read this incredible work of art.</li>
					<li><span className={s.bold}>Girls</span> - In my opinion, Girls by The Luna Brothers is the best undiscovered comic I've come across yet. Faithful Image Comics fans will know of this series, but overrall it seems to have fallen under many readers' radar. Girls is the story of a very small country town that finds itself trapped in a fatal situation that there is no easily discernable way out of. This series falls under what I like to call the "Sex Horror" genre (if that actually is the name, once again I'm making up names). This is another one of my favorite genres, with works such as the movie <span className={s.italics}>It Follows</span> and the comic series <span className={s.italics}>Black Hole</span>. The psychological breakdown of the townspeople trapped in their situation is riveting, and the premise was thoroughly enjoyable every moment. Once the series really revved up, I couldn't put it down. This is an underdog title that I wish I could instantly make as popular as it deserves to be. Worth every penny, Girls is a story that will always stick with me.</li>
					<li><span className={s.bold}>Saga</span> - Saga is a series with the perfect name. It genuinely is a saga, in which we follow a child named Hazel's life as she grows up traversing the universe. Hazel's parents are from opposite sides of an unending war, and when news is spread that a child was born between the warring nations, both sides are determined to eliminate her. This is another series with incredible character development, giving the reader an eagerness to learn more and continue watching the characters (especially Hazel) grow and learn. Fiona Staples has a very unique art style that shines in this space odyssey, and the series itself is unafraid. Saga embraces all aspects of life, holding nothing back, hiding nothing from the reader, and exposing itself without shame. A gorgeous series that almost anyone can pick up and enjoy.</li>
				</ol>
				<p><span className={s.bold}>(Beyond Just) Honorable Mentions</span></p>
				<p>The following series are ones that I absolutely loved that didn't make it onto the exclusive Top 5 list. HOWEVER, I want to stress that these titles are more than just "Honorable Mentions". They are all absolutely incredible, and I love them from the depths of my heart.</p>
				<ul>
					<li>The Sixth Gun</li>
					<li>Fables</li>
					<li>Lazarus</li>
					<li>Nailbiter</li>
					<li>Black Science</li>
					<li>The Underwater Welder</li>
					<li>Fatale</li>
					<li>Fruits Basket</li>
					<li>Bone</li>
				</ul>

				<p>There are many more series that I've greatly enjoyed that didn't make it on the lists. If you'd ever like personal recommendations, please email me and let me know what genres and other works you enjoy (not just limited to comics!). I would be happy to share even more titles with you.</p>
			</div>
		</div>
	);
}

About.propTypes = { title: PropTypes.string.isRequired };

export default withStyles(About, s);