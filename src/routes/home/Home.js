/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriwasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.scss';
import ComicNavigation from '../../components/comicnavigation';
import ComicDisplay from '../../components/comicdisplay';

function Home({ news }) {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <ComicDisplay/>
      </div>
    </div>
  );
}

export default withStyles(Home, s);
