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
import s from './ComicNavigation.scss';

function ComicNavigation() {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <a href="#">Beginning</a>
        <span className={s.spacer}>|</span>
        <a href="#">Previous</a>
        <span className={s.spacer}>|</span>
        <a href="#">Next</a>
        <span className={s.spacer}>|</span>
        <a href="#">End</a>
      </div>

      <div className={s.container}>
        <a href="#">Expand Archives List</a>
      </div>
    </div>
  );
}

export default withStyles(ComicNavigation, s);
