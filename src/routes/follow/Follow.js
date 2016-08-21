/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Follow.scss';

function Follow({ title }) {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h2>{title}</h2>
      </div>
    </div>
  );
}

Follow.propTypes = { title: PropTypes.string.isRequired };

export default withStyles(Follow, s);
