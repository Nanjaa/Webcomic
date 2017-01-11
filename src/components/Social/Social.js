import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Social.scss';
import Link from '../Link';
import FaIconPack from 'react-icons/lib/fa';
import FaTwitter from 'react-icons/lib/fa/twitter';
import FaInstagram from 'react-icons/lib/fa/instagram';
import FaTumblr from 'react-icons/lib/fa/tumblr';
import FaFacebook from 'react-icons/lib/fa/facebook';
import FaEnvelope from 'react-icons/lib/fa/envelope';
import FaRssSquare from 'react-icons/lib/fa/rss-square';

class Social extends React.Component {
  render() {
    return (
      <div className={s.social}>
        <a className={s.twitter} href="https://twitter.com/stephanierpiper" target="_blank">
          <FaTwitter/>
        </a>
        <a className={s.insta} href="https://www.instagram.com/stephanierpiper/" target="_blank">
          <FaInstagram/>
        </a>
        <a className={s.tumblr} href="https://stephanierpiper.tumblr.com/" target="_blank">
          <FaTumblr/>
        </a>
        <a className={s.email} href="#" target="_blank">
          <FaEnvelope/>
        </a>
        <a className={s.rss} href="#" target="_blank">
          <FaRssSquare/>
        </a>
      </div>
    );
  }
}

export default withStyles(Social, s);