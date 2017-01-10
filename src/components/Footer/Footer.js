/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.scss';
import Link from '../Link';
import Navigation from '../Navigation';

function Footer() {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <p>This site will keep track of your reading progress as you enjoy Archaic Rebirth, but be aware that if you clear your history, you'll need to find what page you were on again! If you encounter any problems, please contact me at EMAIL HERE</p>
        <Navigation/>
        <Link className={s.link} to="/">Home</Link>
        <span className={s.spacer}>·</span>
        <Link className={s.link} to="/not-found">Not Found</Link>
      </div>
    </div>
  );
}

export default withStyles(Footer, s);
