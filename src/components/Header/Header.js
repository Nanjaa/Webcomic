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
import s from './Header.scss';
import Link from '../Link';
import Navigation from '../Navigation';

class Header extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Link className={s.brand} to="/">
            <img src={require('./cover.png')} alt="Archaic Rebirth cover image" />
          </Link>
          <div className={s.banner}>
            <Link to="/">
              <h1 className={s.bannerTitle}><img src={require('./logo.png')} alt="Archaic Rebirth logo" /></h1>
            </Link>
            <h2>by Stephanie Piper</h2>
            <Navigation className={s.nav} />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(Header, s);